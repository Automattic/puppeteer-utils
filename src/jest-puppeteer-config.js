export function useJestPuppeteerConfig() {
    process.env.JEST_PUPPETEER_CONFIG = `${__dirname}/jest-puppeteer.config.js`;
}
