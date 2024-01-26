import { injectable } from 'inversify';
import { BaseService } from '.';
import { ActivityDetailPropsType, IActivityService } from 'api/types/activity';

@injectable()
export class ActivityService extends BaseService implements IActivityService {
  openActivityList(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  openActivityDetail(props: ActivityDetailPropsType): Promise<void> {
    throw new Error('Method not implemented.');
    props;
  }
}
