import { myContainer } from './inversify.config';
import { IPortkeyAccountService, IPortkeyConfigService, IPortkeyUIManagerService } from './base';
import { TYPES } from './type';
import { CallCaMethodProps } from 'service/JsModules/SubModules/WalletModule';
import { AssetsState } from './assets';
import { NetworkType } from 'packages/types';
import { UserNetworkType } from 'service/config';
export * from './type';

class Portkey implements IPortkeyAccountService, IPortkeyUIManagerService, IPortkeyConfigService {
  private _portkeyAccountService: IPortkeyAccountService;
  private _portkeyUIManagerService: IPortkeyUIManagerService;
  private _portkeyConfigService: IPortkeyConfigService;
  constructor() {
    this._portkeyAccountService = myContainer.get<IPortkeyAccountService>(TYPES.AccountModule);
    this._portkeyUIManagerService = myContainer.get<IPortkeyUIManagerService>(TYPES.UIManagerModule);
    this._portkeyConfigService = myContainer.get<IPortkeyConfigService>(TYPES.ConfigModule);
  }
  async getCurrentNetworkType(): Promise<NetworkType> {
    return this._portkeyConfigService.getCurrentNetworkType();
  }
  async setCurrentNetworkType(networkType: UserNetworkType, clearWalletAndIgnoreDataLoss = false): Promise<boolean> {
    return this._portkeyConfigService.setCurrentNetworkType(networkType, clearWalletAndIgnoreDataLoss);
  }
  async getAssetsInfo(): Promise<AssetsState> {
    return this._portkeyAccountService.getAssetsInfo();
  }
  async login() {
    return this._portkeyUIManagerService.login();
  }
  async openAssetsDashboard() {
    await this._portkeyUIManagerService.openAssetsDashboard();
  }
  async guardiansManager() {
    await this._portkeyUIManagerService.guardiansManager();
  }
  async settingsManager() {
    await this._portkeyUIManagerService.settingsManager();
  }
  async paymentSecurityManager() {
    await this._portkeyUIManagerService.paymentSecurityManager();
  }
  async scanQRCodeManager() {
    await this._portkeyUIManagerService.scanQRCodeManager();
  }
  async unlockWallet() {
    return this._portkeyUIManagerService.unlockWallet();
  }
  async openSendToken() {
    await this._portkeyUIManagerService.openSendToken();
  }
  async callCaContractMethod(props: CallCaMethodProps) {
    return this._portkeyAccountService.callCaContractMethod(props);
  }
  async getWalletInfo() {
    return this._portkeyAccountService.getWalletInfo();
  }
  async getWalletState() {
    return this._portkeyAccountService.getWalletState();
  }
  async lockWallet() {
    return this._portkeyAccountService.lockWallet();
  }
  async exitWallet() {
    return this._portkeyAccountService.exitWallet();
  }
}
const portkey = new Portkey();
export { portkey };
