/**
 * External dependencies
 */
import { createReadStream } from 'fs';
import { WebClient, ErrorCode } from '@slack/web-api';
import config from 'config';

const {
    TRAVIS_BRANCH,
    TRAVIS_REPO_SLUG,
    TRAVIS_PULL_REQUEST_BRANCH,
    TRAVIS_BUILD_WEB_URL,
    E2E_SLACK_TOKEN,
    E2E_CHANNEL_NAME,
    TRAVIS_PULL_REQUEST,
    E2E_CC_USERS,
    E2E_SLACKBOT_USER,
    E2E_SLACKBOT_EMOJI
} = process.env;


const token = E2E_SLACK_TOKEN ? E2E_SLACK_TOKEN : ( config.has( 'slackToken') ? config.get( 'slackToken' ) : '' );
const conversationId = E2E_CHANNEL_NAME ? E2E_CHANNEL_NAME : ( config.has( 'slackChannel') ? config.get( 'slackChannel' ) : '' );
const ccUserList = E2E_CC_USERS ? E2E_CC_USERS : ( config.has( 'ccUsers') ? config.get( 'ccUsers' ) : '' );
const slackBotUsername = E2E_SLACKBOT_USER ? E2E_SLACKBOT_USER : ( config.has( 'slackBotUsername') ? config.get( 'slackBotUsername' ) : '' );
const slackBotEmoji = E2E_SLACKBOT_EMOJI ? E2E_SLACKBOT_EMOJI : ( config.has( 'slackBotEmoji') ? config.get( 'slackBotEmoji' ) : '' );
const webCli = new WebClient(token);

const repoURL = `https://github.com/${ TRAVIS_REPO_SLUG }`;
const branchName = TRAVIS_PULL_REQUEST_BRANCH !== '' ? TRAVIS_PULL_REQUEST_BRANCH : TRAVIS_BRANCH;
let ccUsers;
let threadId;

if ( ccUserList != '' ) {
    ccUsers = 'cc ' + ccUserList;
}

async function sendRequestToSlack( fn ) {
    try {
        await fn();
    } catch ( error ) {
        // Check the code property and log the response
        if (
            error.code === ErrorCode.PlatformError ||
            error.code === ErrorCode.RequestError ||
            error.code === ErrorCode.RateLimitedError ||
            error.code === ErrorCode.HTTPError
        ) {
            console.log( error.data );
        } else {
            // Some other error, oh no!
            console.log(
                'The error occurred does not match an error we are checking for in this block.'
            );
            console.log( error );
        }
    }
}

const createSection = ( text, type = 'mrkdwn' ) => {
    return {
        type: 'section',
        text: {
            type,
            text,
        },
    };
};

const getThreadMessage = () => {
    const message = [];

    let sectionMessage = `*Travis build:* ${ TRAVIS_BUILD_WEB_URL }
*Github branch:* ${ branchName }`;

   if ( TRAVIS_PULL_REQUEST ) {
       sectionMessage += `
*Github PR URL:* ${ repoURL }/pull/${ TRAVIS_PULL_REQUEST }`
   }

    message.push(
        createSection( sectionMessage )
    );
    if ( ccUsers ) {
        message.push( createSection( ccUsers ) );
    }

    return message;
};

const getLogMessage = ( { name, block, error } ) => {
    let testFailure = '';
    if ( error.name || error.message ) {
        testFailure = error.name + ': ' + error.message;
    }
    const testFullName = block + ' :: ' + name;
    const message = [];
    message.push(
        createSection( `*TEST FAILED:* ${ testFullName }
*Failure reason:* ${ testFailure }` )
    );

    return message;
};

const sendMessageInThread = async ( payload ) => {
    const sendMessage = async () => {
        payload.thread_ts = threadId;

        // For details, see: https://api.slack.com/methods/chat.postMessage
        await sendRequestToSlack( async () => await webCli.chat.postMessage( payload ) );
    }

    if ( threadId ) {
        return await sendMessage();
    }

    let threadPayload = {
        channel: conversationId,
        username: slackBotUsername,
        icon_emoji: slackBotEmoji,
        blocks: getThreadMessage(),
    };

    const threadResponse = await sendRequestToSlack( async () => await webCli.chat.postMessage( threadPayload ) );
    if ( threadResponse && threadResponse.ok ) {
        threadId = threadResponse.ts;
    }

    return await sendMessage();
};

export async function sendFailedTestMessageToSlack( testResult ) {
    await sendMessageToSlack( getLogMessage( testResult ) );
}

export async function sendMessageToSlack( message ) {
    const payload = {
        channel: conversationId,
        username: slackBotUsername,
        icon_emoji: slackBotEmoji,
    };

    if ( typeof message === 'string' ) {
        payload.text = message;
    } else {
        payload.blocks = message;
    }

    await sendMessageInThread( payload );
}

export async function sendSnippetToSlack( message ) {
    const payload = {
        channels: conversationId,
        username: slackBotUsername,
        icon_emoji: slackBotEmoji,
        content: message,
    };

    await sendMessageInThread( payload );
}

export async function sendFailedTestScreenshotToSlack( screenshotOfFailedTest ) {
    const payload = {
        filename: screenshotOfFailedTest,
        file: createReadStream( screenshotOfFailedTest ),
        channels: conversationId,
    };

    await sendMessageInThread( payload );
}
