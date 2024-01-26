import { ActivityDetailPropsType } from 'pages/Activity/ActivityDetail';

export type { ActivityDetailPropsType } from 'pages/Activity/ActivityDetail';

export interface IActivityService {
  openActivityList(): Promise<void>;
  openActivityDetail(props: ActivityDetailPropsType): Promise<void>;
}
