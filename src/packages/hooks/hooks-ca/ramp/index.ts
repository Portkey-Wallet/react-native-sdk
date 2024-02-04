import { useCallback } from 'react';
import { useAppCASelector } from '../../index';
import ramp, { IClientType } from 'packages/ramp';
import { useBuyFiat } from './buy';
import { useSellCrypto } from './sell';
import { PortkeyConfig } from 'global/constants';

export const useRampState = () => useAppCASelector(state => state.ramp);

export const useBuyFiatListState = () => useAppCASelector(state => state.ramp.buyFiatList);
export const useBuyDefaultFiatState = () => useAppCASelector(state => state.ramp.buyDefaultFiat);
export const useBuyDefaultCryptoListState = () => useAppCASelector(state => state.ramp.buyDefaultCryptoList);
export const useBuyDefaultCryptoState = () => useAppCASelector(state => state.ramp.buyDefaultCrypto);

export const useSellCryptoListState = () => useAppCASelector(state => state.ramp.sellCryptoList);
export const useSellDefaultCryptoState = () => useAppCASelector(state => state.ramp.sellDefaultCrypto);
export const useSellDefaultFiatListState = () => useAppCASelector(state => state.ramp.sellDefaultFiatList);
export const useSellDefaultFiatState = () => useAppCASelector(state => state.ramp.sellDefaultFiat);

export const useInitRamp = ({ clientType }: { clientType: IClientType }) => {
  const { refreshRampShow } = useRampEntryShow();
  const { refreshBuyFiat } = useBuyFiat();
  const { refreshSellCrypto } = useSellCrypto();

  return useCallback(async () => {
    const apiUrl = await PortkeyConfig.endPointUrl();
    await ramp.init({ baseUrl: apiUrl, clientType });

    const { isBuySectionShow, isSellSectionShow } = await refreshRampShow(false);

    if (isBuySectionShow) {
      // fetch fiatList and defaultFiat
      await refreshBuyFiat();
    }

    if (isSellSectionShow) {
      // fetch cryptoList and defaultCrypto
      await refreshSellCrypto();
    }
  }, [clientType, refreshRampShow, refreshBuyFiat, refreshSellCrypto]);
};

export const useRampEntryShow = () => {
  const isBuySectionShow = true; // todo_wade

  const isSellSectionShow = true; // todo_wade

  const isRampShow = true; // todo_wade

  const refreshRampShow = useCallback(
    async (isFetch = true) => {
      if (isFetch) {
        await ramp.refreshRampProvider();
      }

      return {
        isRampShow,
        isBuySectionShow,
        isSellSectionShow,
      };
    },
    [isBuySectionShow, isRampShow, isSellSectionShow],
  );

  return {
    isRampShow,
    isBuySectionShow,
    isSellSectionShow,
    refreshRampShow,
  };
};

export * from './buy';
export * from './sell';
