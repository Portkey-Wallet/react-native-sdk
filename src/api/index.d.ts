export * from './types';
import { IToSendHomeParamsType, UnlockedWallet, WalletState } from './types';
import { IAccountService } from './types/account';
import { AssetsState, IAssetsService } from './types/assets';
import { BaseMethodResult, CallCaMethodProps, IContractService } from './types/contract';
import { IDataService } from './types/data';
import { IGuardianService } from './types/guardians';
import { IRampService, RampTabType } from './types/ramp';
import { IScanService } from './types/scan';
import { ISettingsService } from './types/settings';
import { ActivityDetailPropsType, IActivityService } from './types/activity';
declare class Portkey
  implements
    IAccountService,
    IGuardianService,
    IAssetsService,
    IRampService,
    ISettingsService,
    IActivityService,
    IScanService,
    IDataService,
    IContractService
{
  private services;
  constructor();
  callCaContractMethod(props: CallCaMethodProps): Promise<BaseMethodResult>;
  getWalletInfo(): Promise<UnlockedWallet>;
  getWalletState(): Promise<WalletState>;
  getAssetsInfo(): Promise<AssetsState>;
  scanQRCodeManager(): Promise<void>;
  openActivityList(): Promise<void>;
  openActivityDetail(props: ActivityDetailPropsType): Promise<void>;
  settingsManager(): Promise<void>;
  paymentSecurityManager(): Promise<void>;
  openRampHome(toTab?: RampTabType | undefined): Promise<void>;
  openAssetsDashboard(): Promise<void>;
  openSendToken(props: IToSendHomeParamsType): Promise<void>;
  guardiansManager(): Promise<void>;
  login(): Promise<UnlockedWallet | null>;
  exitWallet(): Promise<boolean>;
  lockWallet(): Promise<boolean>;
  unlockWallet(): Promise<UnlockedWallet | null>;
}
declare const portkey: Portkey;
export { portkey };
