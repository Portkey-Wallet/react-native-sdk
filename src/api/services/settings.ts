import { injectable } from 'inversify';
import { BaseService } from '.';
import { AccountError } from 'api/error';
import { PortkeyEntries } from 'config/entries';
import { ISettingsService } from 'api/types/settings';

@injectable()
export class SettingsService extends BaseService implements ISettingsService {
  async settingsManager() {
    if (!(await this.checkIsUnlocked())) {
      throw new AccountError(1001);
    }
    this.openFromExternal(PortkeyEntries.ACCOUNT_SETTING_ENTRY);
  }
  async paymentSecurityManager() {
    if (!(await this.checkIsUnlocked())) {
      throw new AccountError(1001);
    }
    this.openFromExternal(PortkeyEntries.PAYMENT_SECURITY_HOME_ENTRY);
  }
}
