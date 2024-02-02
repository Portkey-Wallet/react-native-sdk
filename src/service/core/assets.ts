import { ITokenItemResponse } from 'network/dto/query';

export interface AssetsState {
  balanceInUsd: string;
  tokens: Array<ITokenItemResponse>;
}
