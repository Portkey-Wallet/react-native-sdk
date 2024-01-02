import { getCachedAllChainInfo } from 'model/chain';
import { getUnlockedWallet } from 'model/wallet';
import { AElfChainStatusItemDTO } from 'network/dto/wallet';
import useLockCallback from 'packages/hooks/useLockCallback';
import { ChainId } from 'packages/types';
import { useCallback, useEffect, useState } from 'react';
import { checkSecuritySafe } from 'utils/security';

interface WalletInfo {
  caHash?: string;
  managerAddress?: string;
  originChainId: ChainId;
}
export function useCurrentWalletInfo() {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    caHash: '',
    managerAddress: '',
    originChainId: 'AELF',
  });
  useEffect(() => {
    (async () => {
      const { caInfo, address: managerAddress, originChainId } = await getUnlockedWallet();
      setWalletInfo({
        caHash: caInfo?.caHash,
        managerAddress,
        originChainId: originChainId as ChainId,
      });
    })();
  }, []);
  return walletInfo;
}

export function useGetChainInfo() {
  const [chainInfoList, setChainInfoList] = useState<Array<AElfChainStatusItemDTO>>();
  useEffect(() => {
    async function fetchData() {
      const response = await getCachedAllChainInfo();
      setChainInfoList(response);
    }
    fetchData();
  }, []);
  const getChainInfo = useCallback(
    (chainId: ChainId) => {
      return chainInfoList?.find(item => item.chainId === chainId);
    },
    [chainInfoList],
  );
  return getChainInfo;
}

export const useSecuritySafeCheckAndToast = (): ((fromChainId?: ChainId) => Promise<boolean>) => {
  const { caHash, originChainId } = useCurrentWalletInfo();

  return useLockCallback(
    async (fromChainId?: ChainId): Promise<boolean> => {
      // if fromChainId exit, use isOriginChainSafe to check, or use isTransferSafe & isSynchronizing
      if (!caHash || !originChainId) return false;
      if (!fromChainId) fromChainId = originChainId;
      return checkSecuritySafe({
        caHash,
        originChainId,
        accelerateChainId: fromChainId,
      });
    },
    [caHash, originChainId],
  );
};
