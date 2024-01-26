import { IScanService } from 'api/types/scan';
import { injectable } from 'inversify';
import { BaseService } from '.';
import { AccountError } from 'api/error';
import { PortkeyEntries } from 'config/entries';

@injectable()
export class ScanService extends BaseService implements IScanService {
  async scanQRCodeManager() {
    if (!(await this.checkIsUnlocked())) {
      throw new AccountError(1001);
    }
    this.openFromExternal(PortkeyEntries.SCAN_QR_CODE);
  }
}
