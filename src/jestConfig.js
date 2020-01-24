const currentDir = __dirname;

export const jestConfig = {
    preset: 'jest-puppeteer',
    clearMocks: true,
    transformIgnorePatterns: [
      'node_modules/(?!(puppeteer-utils)/)'
    ],
    setupFilesAfterEnv: [
        `${currentDir}/setup-env.js`,
        `${currentDir}/jest.test.failure.js`,
        'expect-puppeteer'
    ],
    moduleFileExtensions: [ 'js' ],
    roots: [ 
        '<rootDir>/tests/e2e-tests/specs',
        './specs'
    ],
    testMatch: [ 
        '**/*.(test|spec).js',
        '*.(test|spec).js'
    ],
};