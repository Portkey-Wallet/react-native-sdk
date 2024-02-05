import { NetworkType } from 'packages/types';

export interface IConfig {
  networkConfig: NetworkConfig;
}
export interface ITheme {
  theme: Theme;
  appName: string;
  navigationTheme: NavigationTheme;
}

export type NetworkConfig = {
  apiUrl?: string;
  connectUrl?: string;
  graphQLUrl?: string;
  networkType?: NetworkType;
};
export type Theme = object;
export type NavigationTheme = object;

// global custom config
export class PortkeyConfig {
  static config?: IConfig;
  static theme?: ITheme;
}
