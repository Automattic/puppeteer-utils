/**
 * Internal dependencies
 */
import jestPuppeteerConfig from './jest-puppeteer.config';

const useJestPuppeteerConfig = function() {
    process.env.JEST_PUPPETEER_CONFIG = `${__dirname}/jest-puppeteer.config.js`;
};

export { useJestPuppeteerConfig, jestPuppeteerConfig }

