import { injectable } from 'inversify';
import { BaseService } from '.';
import { ActivityDetailPropsType, IActivityService } from 'api/types/activity';
import { AccountError } from 'api/error';
import { PortkeyEntries } from 'config/entries';

@injectable()
export class ActivityService extends BaseService implements IActivityService {
  async openActivityList() {
    if (!(await this.checkIsUnlocked())) {
      throw new AccountError(1001);
    }
    this.openFromExternal(PortkeyEntries.ACTIVITY_LIST_ENTRY);
  }
  async openActivityDetail(props: ActivityDetailPropsType) {
    const caAddressInfos = Object.entries(props.multiCaAddresses ?? {}).map(it => {
      return { chainId: it[0], caAddress: it[1] };
    });
    if (!(await this.checkIsUnlocked())) {
      throw new AccountError(1001);
    }
    this.openFromExternal(PortkeyEntries.ACTIVITY_DETAIL_ENTRY, { item: props.item, caAddressInfos });
  }
}
