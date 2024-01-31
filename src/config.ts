import { BackEndNetWorkMap } from 'packages/constants/constants-ca/backend-network';

export interface IConfig {
  networkConfig: NetworkConfig;
  entryConfig: IEntryConfig;
}
export interface ITheme {
  theme?: Theme;
  appName?: string;
  navigationTheme?: NavigationTheme;
}

export type NetworkConfig = {
  apiUrl?: string;
  connectUrl?: string;
  graphQLUrl?: string;
  isMainNet?: boolean;
};
export type Theme = object;
export type NavigationTheme = object;

export interface IEntryConfig {
  isBuySectionShow: boolean;
  isSellSectionShow: boolean;
  refreshRampShow: () => Promise<{ isBuySectionShow: boolean; isSellSectionShow: boolean }>;
}

export const defaultEntryConfig: IEntryConfig = {
  isBuySectionShow: true,
  isSellSectionShow: true,
  refreshRampShow: async function () {
    return {
      isBuySectionShow: this.isBuySectionShow,
      isSellSectionShow: this.isSellSectionShow,
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
// interface IConfig {
//   networkConfig: INetworkConfig;
//   entryConfig: IEntryConfig;
// }

// global custom config
export class PortkeyConfig {
  static config: IConfig = defaultConfig;
  static theme?: ITheme = defaultTheme;
}
