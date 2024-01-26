import { UnlockedWallet, WalletState } from './';
import { AssetsState } from './assets';

export interface IDataService {
  getWalletInfo(): Promise<UnlockedWallet>;
  getWalletState(): Promise<WalletState>;
  getAssetsInfo(): Promise<AssetsState>;
  // getNTFInfo(): Promise<any>;
  // getActivityInfo(): Promise<any>;
}
