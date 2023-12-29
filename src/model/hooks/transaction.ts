import { CheckTransactionFeeResult } from 'network/dto/transaction';
import { useState } from 'react';
import { useIntervalPolling } from './interval';
import { NetworkController } from 'network/controller';

const INIT_TRANSACTION_FEE_ITEM: CheckTransactionFeeResult = ['AELF', 'tDVV', 'tDVW'].map(chainId => ({
  chainId,
  transactionFee: {
    ach: '0.000',
    crossChain: '0.000',
    max: '0.000',
    redPackage: '0.000',
  },
}));

export const useTransactionFee = () => {
  const [transactionFee, setTransactionFee] = useState<CheckTransactionFeeResult>(INIT_TRANSACTION_FEE_ITEM);
  useIntervalPolling({
    fetcher: async () => {
      const result = await NetworkController.getTransactionFee({
        chainIds: ['AELF', 'tDVV', 'tDVW'],
      });
      return result;
    },
    updater: setTransactionFee,
  });
  return transactionFee;
};
