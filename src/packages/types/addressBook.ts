import { RpcUrlNetworkName } from './';
export interface AddressBookItem {
  name: string;
  address: string;
  key?: string;
}

export type AddressBookType = Record<RpcUrlNetworkName, AddressBookItem[]>;
