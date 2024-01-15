import { TestCaseApi } from 'apiTest/type';
import { portkey } from 'service/core';
/*
NOTE: 
1. UI op need to open a new page, so a UI op needs to be placed in an array 
2. The name of ui cases must start with 'UI' string,  example: UITestLoginCases, UITestAssetsDashboardCases
*/

// open login page
export const UITestLoginCases: Array<TestCaseApi> = [
  {
    describe: 'Test login',
    run: async (testContext, caseName) => {
      try {
        const result = await portkey.login();
        testContext.assert(caseName, !!result, 'invoke failed');
        console.warn('wallet info', JSON.stringify(result));
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
// open asset dashboard page
export const UITestAssetsDashboardCases: Array<TestCaseApi> = [
  {
    describe: 'Test openAssetsDashboard',
    run: async (testContext, caseName) => {
      try {
        await portkey.openAssetsDashboard();
        testContext.assert(caseName, true, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
// open guardians manager page
export const UITestGuardiansManagerCases: Array<TestCaseApi> = [
  {
    describe: 'Test guardiansManager',
    run: async (testContext, caseName) => {
      try {
        await portkey.guardiansManager();
        testContext.assert(caseName, true, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
// open settings manager page
export const UITestSettingsManagerCases: Array<TestCaseApi> = [
  {
    describe: 'Test settingsManager',
    run: async (testContext, caseName) => {
      try {
        await portkey.settingsManager();
        testContext.assert(caseName, true, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
// open paymentSecurity manager page
export const UITestPaymentSecurityManagerCases: Array<TestCaseApi> = [
  {
    describe: 'Test paymentSecurityManager',
    run: async (testContext, caseName) => {
      try {
        await portkey.paymentSecurityManager();
        testContext.assert(caseName, true, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
// open scanQRCode page
export const UITestScanQRCodeManagerCases: Array<TestCaseApi> = [
  {
    describe: 'Test scanQRCodeManager',
    run: async (testContext, caseName) => {
      try {
        await portkey.scanQRCodeManager();
        testContext.assert(caseName, true, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
// open check pin page, unlock wallet
export const UITestUnlockWalletCases: Array<TestCaseApi> = [
  {
    describe: 'Test unlockWallet',
    run: async (testContext, caseName) => {
      try {
        const result = await portkey.unlockWallet();
        testContext.assert(caseName, !!result, 'invoke failed');
        console.warn('wallet info', JSON.stringify(result));
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
// open send token page, unlock wallet
export const UITestSendTokenCases: Array<TestCaseApi> = [
  {
    describe: 'Test openSendToken',
    run: async (testContext, caseName) => {
      try {
        await portkey.openSendToken();
        testContext.assert(caseName, true, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
