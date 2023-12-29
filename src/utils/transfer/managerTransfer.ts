import { SendOptions } from 'packages/contracts/types';
import { ContractBasic } from 'packages/utils/contract';

export const managerTransfer = ({
  contract,
  paramsOption,
  sendOptions,
}: {
  contract: ContractBasic;
  sendOptions?: SendOptions;
  paramsOption: { caHash: string; symbol: string; to: string; amount: number | string; memo?: string };
}) => {
  return contract.callSendMethod('ManagerTransfer', '', paramsOption, sendOptions);
};
