export interface CheckTransactionFeeParams {
  chainIds: string[];
}

export type CheckTransactionFeeResult = { chainId: string; transactionFee: TransactionFeeItem }[];

export interface TransactionFeeItem {
  ach: string;
  crossChain: string;
  max: string;
  redPackage: string;
}
