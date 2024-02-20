import { IConfig, IEntryConfig, ITheme, NetworkConfig } from 'api/config';
import { BackEndNetWorkMap } from 'packages/constants/constants-ca/backend-network';

export const defaultEntryConfig: IEntryConfig = {
  isBuySectionShow: true,
  isSellSectionShow: true,
  refreshRampShow: async function () {
    return {
      isBuySectionShow: true,
      isSellSectionShow: true,
    };
  },
};

export const defaultNetworkConfig: NetworkConfig = {
  apiUrl: BackEndNetWorkMap['back-end-mainnet'].apiUrl,
  graphQLUrl: BackEndNetWorkMap['back-end-mainnet'].graphqlUrl,
  connectUrl: BackEndNetWorkMap['back-end-mainnet'].connectUrl,
  isMainNet: true,
};
export const defaultConfig: IConfig = {
  networkConfig: defaultNetworkConfig,
  entryConfig: defaultEntryConfig,
};
export const defaultTheme: ITheme = {};

// global custom config
export class PortkeyConfig {
  static config: IConfig = defaultConfig;
  static theme?: ITheme = defaultTheme;
}
