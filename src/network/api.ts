import { ServiceInit } from 'packages/api/server/config';
import { BaseConfig, RequestConfig } from 'packages/api/types';
import { NetworkController } from 'network/controller';

export class RnsdkService extends ServiceInit {
  send = async (base: BaseConfig, config?: RequestConfig | undefined): Promise<any> => {
    const url = await this.parseUrl(config?.url);
    const method = (config?.method || 'GET') as 'GET' | 'POST';
    return NetworkController.realExecute(url, method, config?.params, config?.headers);
  };
}

export default new RnsdkService();
