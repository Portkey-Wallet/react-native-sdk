import { PortkeyConfig, setEndPointUrl } from 'global/constants';
import { injectable } from 'inversify';
import { exitWallet, isWalletExists, isWalletUnlocked } from 'model/verify/core';
import { BackEndNetWorkMap } from 'packages/constants/constants-ca/backend-network';
import { NetworkType } from 'packages/types';
import { IPortkeyConfigService } from 'service/core/base';

@injectable()
export class PortkeyConfigService implements IPortkeyConfigService {
  async getCurrentNetworkType(): Promise<NetworkType> {
    const networkUrl = await PortkeyConfig.endPointUrl();
    return Object.values(BackEndNetWorkMap).find(it => it.apiUrl === networkUrl)?.networkType || 'MAIN';
  }
  async setCurrentNetworkType(networkType: UserNetworkType, clearWalletAndIgnoreDataLoss = false): Promise<boolean> {
    const walletExists = await isWalletExists();
    if (!clearWalletAndIgnoreDataLoss) {
      if (walletExists && !(await isWalletUnlocked())) {
        throw new Error(
          'wallet not unlocked! Please unlock the wallet first or set clearWalletAndIgnoreDataLoss to true',
        );
      }
    }
    walletExists && (await exitWallet());
    setEndPointUrl(Object.values(BackEndNetWorkMap).find(it => it.networkType === networkType)?.apiUrl || '');
    return true;
  }
}

export type UserNetworkType = 'MAIN' | 'TESTNET';
