import { IActivitiesApiResponse } from 'network/dto/query';
import { UnlockedWallet, WalletState } from './';
import { AssetsState } from './assets';

export interface IDataService {
  getWalletInfo(containMultiCaAddresses?: boolean): Promise<UnlockedWallet>;
  getWalletState(): Promise<WalletState>;
  getAssetsInfo(): Promise<AssetsState>;
  // getNTFInfo(): Promise<any>;
  getActivityInfoList({ offset, totalCount }: { offset: number; totalCount?: number }): Promise<IActivitiesApiResponse>;
}
