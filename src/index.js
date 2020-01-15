import * as jestPuppeteerConfig from './jest-puppeteer-config';
import {
  clickAndWaitForNewPage,
  getAccountCredentials,
  isEventuallyPresent,
  isEventuallyVisible,
  logDebugLog,
  logHTML,
  waitAndClick,
  waitAndType,
  waitForSelector,
  scrollIntoView
} from './page-utils';
import {
  WP_ADMIN_USER,
  WP_BASE_URL,
  WP_PASSWORD,
  WP_USERNAME
} from './setup';
import { jestConfig } from './jestConfig';
import Page from './page';

export {
  jestPuppeteerConfig,
  clickAndWaitForNewPage,
  getAccountCredentials,
  isEventuallyPresent,
  isEventuallyVisible,
  logDebugLog,
  logHTML,
  waitAndClick,
  waitAndType,
  waitForSelector,
  scrollIntoView,
  WP_ADMIN_USER,
  WP_BASE_URL,
  WP_USERNAME,
  WP_PASSWORD,
  jestConfig,
  Page
}