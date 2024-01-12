import { UnlockedWallet, CallCaMethodProps, BaseMethodResult, WalletState } from './type';
import { AssetsState } from './assets';

export interface IPortkeyAccountService {
  callCaContractMethod(props: CallCaMethodProps): Promise<BaseMethodResult>;
  getWalletInfo(): Promise<UnlockedWallet>;
  getWalletState(): Promise<WalletState>;
  getAssetsInfo(): Promise<AssetsState>;
  lockWallet(): Promise<boolean>;
  exitWallet(): Promise<boolean>;
}

export interface IPortkeyUIManagerService {
  login(): Promise<UnlockedWallet | null>;
  openAssetsDashboard(): Promise<void>;
  guardiansManager(): Promise<void>;
  scanQRCodeManager(): Promise<void>;
  settingsManager(): Promise<void>;
  paymentSecurityManager(): Promise<void>;
  unlockWallet(): Promise<UnlockedWallet | null>;
}
