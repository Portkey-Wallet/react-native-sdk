import { ITokenItemResponse } from 'network/dto/query';
import { IToSendHomeParamsType } from '.';

export interface AssetsState {
  balanceInUsd: string;
  tokens: Array<ITokenItemResponse>;
}

export interface IAssetsService {
  openAssetsDashboard(): Promise<void>;
  openSendToken(props: IToSendHomeParamsType): Promise<void>;
}
