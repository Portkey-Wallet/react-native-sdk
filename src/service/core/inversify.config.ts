import { Container } from 'inversify';
import { TYPES } from './type';
import { IPortkeyAccountService, IPortkeyConfigService, IPortkeyUIManagerService } from './base';
import { PortkeyAccountService } from './account';
import { UIManagerService } from 'service/ui';
import { PortkeyConfigService } from 'service/config';
import { Portkey } from '.';

const myContainer = new Container();
myContainer.bind<IPortkeyAccountService>(TYPES.AccountModule).to(PortkeyAccountService);
myContainer.bind<IPortkeyUIManagerService>(TYPES.UIManagerModule).to(UIManagerService);
myContainer.bind<IPortkeyConfigService>(TYPES.ConfigModule).to(PortkeyConfigService);

export { myContainer };
