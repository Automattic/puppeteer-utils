const currentDir = __dirname;

export const jestConfig = {
    preset: 'jest-puppeteer',
    setupFiles: [`${currentDir}/setup.js`],
    setupFilesAfterEnv: [
        `${currentDir}/setup-env.js`,
        `${currentDir}/jest.test.failure.js`,
        'expect-puppeteer'
    ]
};