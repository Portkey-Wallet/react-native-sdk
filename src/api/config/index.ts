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
