import { IAssetsService } from 'api/types/assets';
import { BaseService } from '.';
import { injectable } from 'inversify';
import { IToSendHomeParamsType } from 'service/core';
import { AccountError } from 'service/error';
import { PortkeyEntries } from 'config/entries';

@injectable()
export class AssetsService extends BaseService implements IAssetsService {
  async openAssetsDashboard() {
    if (!(await this.checkIsUnlocked())) {
      throw new AccountError(1001);
    }
    this.openFromExternal(PortkeyEntries.ASSETS_HOME_ENTRY);
  }
  async openSendToken(props: IToSendHomeParamsType) {
    if (!(await this.checkIsUnlocked())) {
      throw new AccountError(1001);
    }
    this.openFromExternal(PortkeyEntries.SEND_TOKEN_HOME_ENTRY, props);
  }
}
