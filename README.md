# Puppeteer Utilities for WordPress (automattic/puppeteer-utils)
Utilities and configuration for running puppeteer against WordPress.


## How to use
This package has several utilities and configurations that can be used in your package.


### Configurations

#### Jest Config
[This configuration](./src/jestConfig.js) pulls in several setup scripts as well as enabling screenshots and slack reporting. The easiest way is to create a `jest.config.js` file in the root of your project or putting it somewhere else and using the Jest param `--config path\to\config\file`. To pull in the Jest config from this package, put the code below in `jest.config.js`.
```javascript
const { jestConfig } = require( '@automattic/puppeteer-utils' );

module.exports = jestConfig;
```


#### Jest Puppeteer Config
There are two options for the Jest Puppeteer config. 

**Option 1:** Use the Jest Puppeteer config as is from this package. The `useJestPuppeteerConfig` method sets the `JEST_PUPPETEER_CONFIG` environment variable to point to the config file within the package. A good place to use this is in the `jest.config.js` file created above.
```javascript
const { useJestPuppeteerConfig } = require( '@automattic/puppeteer-utils' );

useJestPuppeteerConfig();
```

**Option 2:** Create your own `jest-puppeteer.config.js` file and set the `JEST_PUPPETEER_CONFIG` to point to your file. You can use the config from this package as a base, or as it is.
```javascript
const { jestPuppeteerConfig } = require( '@automattic/puppeteer-utils' );

module.exports = jestPuppeteerConfig;
```


#### Overwriting or extending Jest Config or Jest Puppeteer Config
If you need to add config values, scripts or overwrite values, you can do so. Here is an example of adding a new setup script.
```javascript
const { jestConfig } = require( '@automattic/puppeteer-utils' );

// Save current config
const jestConfigMod = jestConfig;

// Get current value for setup files
const setupFiles = jestConfig.setupFiles;

// Add an extra setup file to the current value
setupFiles.push( './lib/setup.js' );

// Set the new value
jestConfigMod.setupFiles = setupFiles;

module.exports = jestConfigMod;
```


#### Page Utilities
The Page object offers several functions that extend existing puppeteer functionality. 
```javascript
import { waitAndType, waitAndClick } from '@automattic/puppeteer-utils';

const titleSelector = '.my-title';
const title = 'My Test Title';

await waitAndClick( this.page, titleSelector );
await waitAndType( this.page, titleSelector, title );
```


## Node Config and Environment variables

#### Node Config
Create a Node [config file](https://www.npmjs.com/package/config) in your project and include these values. You may need to use the `NODE_CONFIG_DIR` to point to the directory of the config file.

| Value | Description |
| ------------- | ------------- |
| ccUsers | Users to CC in Slack. Use format `<@MYID>` where MYID is the string of numbers and letters of Slack Member ID |
| slackBotEmoji | Emoji to use for Slack bot messages ie. `:smile:`. See also E2E_SLACKBOT_EMOJI environment variable|
| slackBotUsername | Display name for Slack bot. See also E2E_SLACKBOT_USER environment variable|
| slackChannel | Channel for Slack reporting. See also E2E_CHANNEL_NAME environment variable |
| slackToken | Token for Slack reporting. See also E2E_SLACK_TOKEN environment variable |


#### Environment Variables
| Value | Description |
| ------------- | ------------- |
| E2E_SLACK_TOKEN | Slack token for reporting |
| E2E_CHANNEL_NAME | Channel name for slack reporting |
| E2E_SLACKBOT_USER | Emoji to use for Slack bot messages. `:smile:` |
| E2E_SLACKBOT_EMOJI | Display name for Slack bot. |
| E2E_DEBUG | Show debug logging for e2e tests. Default: false |
| E2E_EXE_PATH | Path to executable to run for tests. Use this to run tests in Chrome instead of Chromium |