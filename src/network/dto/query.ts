import { AddressItem, BaseListResponse, RecentContactItemType } from '@portkey/services';
import { CaHolderInfo, IImInfo } from 'packages/im';
import { ITokenInfoType, INftInfoType } from 'packages/store/store-ca/assets/type';
import { ChainId } from 'packages/types';

export interface SearchTokenListParams {
  keyword?: string; // used to filter token list, can be empty
  chainIdArray?: string[]; // if not provided, it's ['AELF', 'tDVV','tDVW']
}

export interface FetchBalanceConfig {
  skipCount?: number;
  maxResultCount?: number;
  caAddressInfos: Array<CaAddressInfoType>;
}

export type FetchBalanceResult = {
  data: ITokenItemResponse[];
  totalRecordCount: number;
};

export type ITokenItemResponse = {
  decimals: number;
  symbol: string;
  tokenContractAddress: string;
  balance: string;
  chainId: string;
  balanceInUsd: string;
  imageUrl: string;
  price: number;
};

export type CaAddressInfoType = { chainId: string; caAddress: string };

export type GetUserTokenListResult = {
  items: IUserTokenItem[];
  totalRecordCount: number;
};

export type IUserTokenItem = {
  isDisplay: boolean;
  isDefault: boolean;
  sortWeight: number;
  token: {
    chainId: ChainId;
    decimals: number;
    address: string;
    symbol: string;
    id: string;
  };
  id: string;
  userId: string;
};

export type FetchTokenPriceResult = {
  items: Array<{ symbol: string; priceInUsd: number }>;
};
export type FetchAccountNftCollectionListParams = {
  skipCount?: number;
  maxResultCount: number;
  caAddressInfos: CaAddressInfosType;
};

export type FetchAccountNftCollectionItemListParams = {
  symbol: string;
  caAddressInfos: CaAddressInfosType;
  skipCount?: number;
  maxResultCount: number;
};

export type FetchAccountNftCollectionItemListResult = {
  data: INftCollectionItem[];
  totalRecordCount: number;
};

export type CaAddressInfosType = { chainId: string; caAddress: string }[];

export type FetchAccountNftCollectionListResult = {
  data: INftCollection[];
  totalRecordCount: number;
};

export type INftCollection = {
  chainId: ChainId;
  collectionName: string;
  imageUrl: string;
  itemCount: number;
  symbol: string;
};

export type INftCollectionItem = {
  alias: string;
  balance: string;
  chainId: string;
  imageLargeUrl: string;
  imageUrl: string;
  symbol: string;
  tokenContractAddress: string;
  tokenId: string;
  totalSupply: string;
};

export type GetAccountAssetsByKeywordsParams = {
  maxResultCount: number;
  skipCount: number;
  keyword?: string;
  caAddressInfos: CaAddressInfosType;
  width?: number;
  height?: number;
};

export type GetAccountAssetsByKeywordsResult = {
  data: IAssetItemType[];
  totalRecordCount: number;
};

export interface IAssetItemType {
  chainId: string;
  symbol: string;
  address: string;
  tokenInfo?: ITokenInfoType;
  nftInfo?: INftInfoType;
}

export type GetRecentTransactionParams = {
  caAddressInfos: CaAddressInfosType;
  skipCount?: number;
  maxResultCount?: number;
};

export type RecentTransactionResponse = BaseListResponse<RecentContactItemType>;

export interface GetContractAddressesParams {
  keyword?: string;
  page?: number;
  size?: number;
  modificationTime?: number; // default is Date.now()
}

export type GetContractListApiType = {
  totalCount: number;
  items: Array<ContactItemType>;
};

export interface ContactItemType {
  id: string;
  index: string;
  name: string;
  avatar?: string;
  addresses: AddressItem[];
  modificationTime: number;
  isDeleted: boolean;
  userId: string;
  caHolderInfo?: Partial<CaHolderInfo>;
  imInfo?: Partial<IImInfo>;
  isImputation?: boolean;
}
