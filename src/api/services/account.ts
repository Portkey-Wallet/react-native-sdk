import { UnlockedWallet } from 'api/types';
import { IAccountService } from 'api/types/account';
import { injectable } from 'inversify';
import { BaseService } from '.';
import { LoginResult } from 'model/verify/entry';
import { PortkeyEntries } from 'config/entries';
import { AccountError, errorMap } from 'api/error';
import { isWalletUnlocked } from 'model/verify/core';
import { callRemoveManagerMethod } from 'model/contract/handler';
import { exitWallet as exitInternalWallet, lockWallet as lockInternalWallet } from 'model/verify/core';
import { CheckPinResult } from 'pages/Pin/CheckPin';
@injectable()
export class AccountService extends BaseService implements IAccountService {
  login(): Promise<UnlockedWallet | null> {
    return new Promise((resolve, reject) => {
      this.openResultFromExternal<LoginResult>(PortkeyEntries.SIGN_IN_ENTRY, async res => {
        if (res) {
          resolve(res?.data?.walletInfo ?? null);
        } else {
          reject(new AccountError(1004));
        }
      });
    });
  }
  async exitWallet() {
    if (!(await isWalletUnlocked())) {
      console.warn(errorMap.get(1001));
      return false;
    }
    try {
      const res = await callRemoveManagerMethod();
      if (!res.error) {
        exitInternalWallet();
      } else {
        console.warn('exitWallet', JSON.stringify(res.error));
        return false;
      }
      return true;
    } catch (e: any) {
      throw new AccountError(9999, e?.message || e);
    }
  }
  async lockWallet() {
    if (!(await isWalletUnlocked())) {
      console.warn(errorMap.get(1001));
      return false;
    }
    await lockInternalWallet();
    return true;
  }
  async unlockWallet(): Promise<UnlockedWallet | null> {
    if (!(await this.checkIsLocked())) {
      throw new AccountError(1001);
    }
    return new Promise((resolve, reject) => {
      this.openResultFromExternal<CheckPinResult>(PortkeyEntries.CHECK_PIN, res => {
        if (res) {
          resolve(res.data?.walletInfo ?? null);
        } else {
          reject(new AccountError(1003));
        }
      });
    });
  }
}
