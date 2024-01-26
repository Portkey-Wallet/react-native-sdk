import { IGuardianService } from 'api/types/guardians';
import { injectable } from 'inversify';
import { BaseService } from '.';
import { AccountError } from 'api/error';
import { PortkeyEntries } from 'config/entries';

@injectable()
export class GuardiansService extends BaseService implements IGuardianService {
  async guardiansManager() {
    if (!(await this.checkIsUnlocked())) {
      throw new AccountError(1001);
    }
    this.openFromExternal(PortkeyEntries.GUARDIAN_HOME_ENTRY);
  }
}
