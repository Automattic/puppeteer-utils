# Puppeteer Utilities for WordPress (puppeteer-utils)
Utilities and configuration for running puppeteer against WordPress.


## How to use
This package has several utilities and configurations that can be used in your package.

### Configurations
#### Jest Config
This configuration pulls in several setup scripts as well as enabling screenshots and slack reporting.
```javascript
const { jestConfig } = require( 'puppeteer-utils' );

module.exports = jestConfig;

```

#### Jest Puppeteer Config
This config is set by using an environment variable pointing to the config file that is used by the Jest Puppeteer package.
```javascript
const { jestPuppeteerConfig } = require( 'puppeteer-utils' );

jestPuppeteerConfig.useJestPuppeteerConfig();

```
#### Overwriting or extending Jest Config
If you need to add config values, scripts or overwrite values, you can do so. Here is an example of adding a new setup script.
```javascript
const { jestConfig } = require( 'puppeteer-utils' );

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
import { waitAndType, waitAndClick } from 'puppeteer-utils';

const titleSelector = '.my-title';
const title = 'My Test Title';

await waitAndClick( this.page, titleSelector );
await waitAndType( this.page, titleSelector, title );
```
