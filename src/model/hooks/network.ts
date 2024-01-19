import { BackEndNetWorkMap } from 'packages/constants/constants-ca/backend-network';
import { NetworkType } from 'packages/types';
import { PortkeyConfig } from 'global/constants';
import useEffectOnce from 'hooks/useEffectOnce';
import { useState } from 'react';
import { AElfChainStatusItemDTO } from 'network/dto/wallet';
import { NetworkController } from 'network/controller';

export const getCurrentNetworkType = async (): Promise<NetworkType> => {
  const endPointUrl = await PortkeyConfig.endPointUrl();
  switch (endPointUrl) {
    case BackEndNetWorkMap['back-end-test1'].apiUrl: {
      return 'TEST1';
    }

    case BackEndNetWorkMap['back-end-mainnet'].apiUrl: {
      return 'MAINNET';
    }

    case BackEndNetWorkMap['back-end-testnet'].apiUrl:
    default: {
      return 'TESTNET';
    }
  }
};

export const useCurrentNetworkType = () => {
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>('MAINNET');
  useEffectOnce(async () => {
    setCurrentNetwork(await getCurrentNetworkType());
  });
  return currentNetwork;
};

export const useChainsNetworkInfo = () => {
  const [chainsNetworkInfo, setChainsNetworkInfo] = useState<Record<string, AElfChainStatusItemDTO>>({});
  useEffectOnce(async () => {
    const networkInfo = await NetworkController.getNetworkInfo();
    const info = networkInfo.items.reduce((acc, cur) => {
      acc[cur.chainId] = cur;
      return acc;
    }, {} as Record<string, AElfChainStatusItemDTO>);
    setChainsNetworkInfo(info);
  });
  return {
    chainsNetworkInfo,
  };
};
