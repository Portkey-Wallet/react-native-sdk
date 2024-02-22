import { ChainType } from '@portkey/provider-types';
import { NetworkType } from '..';

export type NetworkItem = {
  name: string;
  walletType: ChainType;
  networkType: NetworkType;
  isActive?: boolean;
  apiUrl: string;
  graphqlUrl: string;
  networkIconUrl?: string;
  connectUrl: string;
  tokenClaimContractAddress?: string;
  cmsUrl?: string;
  s3Url?: string;
  referralUrl?: string;
  portkeyFinanceUrl?: string; // portkey website url
  portkeyOpenLoginUrl?: string; // web page
  buyConfig?: {
    ach?: {
      appId?: string;
      baseUrl?: string;
    };
  };
  imApiUrl?: string;
  imWsUrl?: string;
  imS3Bucket?: string;
  eBridgeUrl?: string;
  eTransferUrl?: string;
  rampTestEoaAddress?: string;
};
