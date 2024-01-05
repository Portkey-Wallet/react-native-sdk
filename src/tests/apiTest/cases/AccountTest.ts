import { getUnlockedWallet } from 'model/wallet';
import { TestCaseApi } from 'service/JsModules/types';
import { WalletState, portkey } from 'service/core';

//This array stores test cases where the wallet is the unlocked state
export const UnLockedWalletTestCases: Array<TestCaseApi> = [
  {
    describe: 'Test ContractMethod GetVerifierServers',
    run: async (testContext, caseName) => {
      try {
        const result = await portkey.callCaContractMethod({
          contractMethodName: 'GetVerifierServers',
          isViewMethod: true,
          params: {},
        });
        testContext.assert(caseName, result.status === 'success', 'invoke failed:' + result.error);
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
  {
    describe: 'Test ContractMethod GetHolderInfo',
    run: async (testContext, caseName) => {
      try {
        const {
          caInfo: { caHash },
        } = await getUnlockedWallet({ getMultiCaAddresses: false });
        const result = await portkey.callCaContractMethod({
          contractMethodName: 'GetHolderInfo',
          isViewMethod: true,
          params: { caHash },
        });
        testContext.assert(caseName, result.status === 'success', 'invoke failed:' + result.error);
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
  {
    describe: 'Test GetWalletInfo',
    run: async (testContext, caseName) => {
      try {
        const walletInfo = await portkey.getWalletInfo();
        testContext.assert(caseName, !!walletInfo, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
  {
    describe: 'Test WalletState is unlocked',
    run: async (testContext, caseName) => {
      try {
        const walletState = await portkey.getWalletState();
        testContext.assert(caseName, walletState === WalletState.UNLOCKED, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
//This array stores test cases where the wallet is the locked state
export const LockedWalletTestCases: Array<TestCaseApi> = [
  {
    describe: 'Test WalletState is locked',
    run: async (testContext, caseName) => {
      try {
        const walletState = await portkey.getWalletState();
        testContext.assert(caseName, walletState === WalletState.LOCKED, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
//This array stores test cases without wallet
export const NoneWalletTestCases: Array<TestCaseApi> = [
  {
    describe: 'Test Wallet is none',
    run: async (testContext, caseName) => {
      try {
        const walletState = await portkey.getWalletState();
        testContext.assert(caseName, walletState === WalletState.NONE, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
//Special case， lock wallet op
export const LockWalletCase: Array<TestCaseApi> = [
  {
    describe: 'Test LockWallet',
    run: async (testContext, caseName) => {
      try {
        const result = await portkey.lockWallet();
        testContext.assert(caseName, result, 'invoke failed');
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
//Special case， exit wallet op
export const ExitWalletCase: Array<TestCaseApi> = [
  {
    describe: 'Test ExitWallet',
    run: async (testContext, caseName) => {
      try {
        const result = await portkey.exitWallet();
        testContext.assert(caseName, result, 'invoke failed');
        console.warn(JSON.stringify(result));
      } catch (e: any) {
        testContext.assert(caseName, false, e?.toString() ?? 'failed');
      }
    },
  },
];
