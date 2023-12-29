import { SendOptions } from 'packages/contracts/types';
import { BaseToken } from 'packages/types/types-eoa/token';
import { ContractBasic } from 'packages/utils/contract';
import { managerForwardCall } from './managerForwardCall';

const sameChainTransfer = ({
  contract,
  caHash,
  amount,
  tokenInfo,
  memo = '',
  toAddress: to,
}: {
  contract: ContractBasic;
  tokenInfo: BaseToken;
  caHash: string;
  amount: number | string;
  toAddress: string;
  memo?: string;
  sendOptions?: SendOptions;
}) => {
  return managerForwardCall({
    contract,
    paramsOption: {
      caHash,
      contractAddress: tokenInfo.address,
      methodName: 'Transfer',
      args: {
        symbol: tokenInfo.symbol,
        to,
        amount,
        memo,
      },
    },
  });
};

export default sameChainTransfer;
