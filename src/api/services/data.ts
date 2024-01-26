import { WalletState } from 'api/types';
import { AssetsState } from 'api/types/assets';
import { IDataService } from 'api/types/data';
import BigNumber from 'bignumber.js';
import { injectable } from 'inversify';
import { isWalletExists, isWalletUnlocked } from 'model/verify/core';
import { getUnlockedWallet } from 'model/wallet';
import { NetworkController } from 'network/controller';
import { ZERO } from 'packages/constants/misc';
import { AccountError } from 'service/error';

@injectable()
export class DataService implements IDataService {
  async getWalletInfo() {
    if (!(await isWalletUnlocked())) {
      throw new AccountError(1001);
    }
    const wallet = await getUnlockedWallet();
    return wallet;
  }

  async getWalletState() {
    const exist = await isWalletExists();
    const unlocked = await isWalletUnlocked();
    return exist ? (unlocked ? WalletState.UNLOCKED : WalletState.LOCKED) : WalletState.NONE;
  }
  async getAssetsInfo(): Promise<AssetsState> {
    try {
      if (!(await isWalletUnlocked())) {
        throw new AccountError(1001);
      }
      const { multiCaAddresses } = await getUnlockedWallet({ getMultiCaAddresses: true });
      const result = await NetworkController.fetchUserTokenBalance({
        maxResultCount: 100,
        skipCount: 0,
        caAddressInfos: Object.entries(multiCaAddresses).map(([chainId, caAddress]) => ({
          chainId,
          caAddress,
        })),
      });
      const { data: tokenList = [] } = result || {};
      return {
        tokens: tokenList,
        balanceInUsd: tokenList
          .reduce((prev, it) => {
            const { balanceInUsd } = it;
            return BigNumber(prev).plus(balanceInUsd);
          }, ZERO)
          .toString(),
      };
    } catch (e: any) {
      throw new AccountError(9999, e?.message || e);
    }
  }
}
