import { TokenItemType } from 'packages/types/types-eoa/token';
import { ContractBasic } from 'packages/contracts/utils/ContractBasic';

export const getELFChainBalance = async (tokenContract: any, symbol: string, owner: string) => {
  let balance;
  if (tokenContract instanceof ContractBasic) {
    const req = await tokenContract.callViewMethod('GetBalance', {
      symbol,
      owner,
    });
    if (!req.error) {
      balance = req.data;
    }
  } else {
    balance = await tokenContract.GetBalance.call({
      symbol,
      owner,
    });
  }
  console.warn(balance, 'balance');
  return balance?.balance ?? balance?.amount ?? 0;
};

interface useBalancesProps {
  tokens: TokenItemType | TokenItemType[];
  tokenAddress: string;
  currentAccount?: any;
  currentChain: any;
  rpcUrl: string;
  tokenContract?: ContractBasic;
  delay?: number;
}

export const getBalance = async ({
  tokens,
  currentAccount,
  currentChain,
  tokenContract,
  delay = 10000,
}: useBalancesProps): Promise<string[]> => {
  const tokensList = Array.isArray(tokens) ? tokens.map(item => item.symbol) : [tokens.symbol];
  if (!currentAccount?.address) return tokensList.map(() => '');
  let promise;

  const timer = setTimeout(() => {
    return Promise.reject();
  }, delay);

  if (currentChain.chainType === 'aelf') {
    // elf chain
    // const tokenContract = await getTokenContract(rpcUrl, tokenAddress, wallet1);

    if (!tokenContract) return Promise.reject();
    promise = tokensList.map(symbol => {
      console.log(symbol, 'symbol');

      if (symbol) return getELFChainBalance(tokenContract, symbol, currentAccount?.address);
    });
  } else if (currentChain.chainType === 'ethereum') {
    // erc20 chain
    // promise = tokensList.map(i => {
    //   if (i && library) return getBalance(library, i, account);
    // });
    return Promise.reject();
  } else {
    // other not support
    throw Error('Not Support');
  }

  if (!promise) throw Error('Something error');
  const bs = await Promise.all(promise);
  clearTimeout(timer);

  return bs;
};
