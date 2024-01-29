import { useCallback, useState } from 'react';
import { getSellCrypto, getSellFiat } from 'packages/utils/ramp';
import { IRampCryptoDefault, IRampCryptoItem, IRampFiatDefault, IRampFiatItem } from 'packages/ramp';

export const useSellCrypto = () => {
  const [sellCryptoList, setSellCryptoList] = useState<IRampCryptoItem[]>([]);
  const [sellDefaultCrypto, setSellDefaultCrypto] = useState<IRampCryptoDefault>();
  const [sellDefaultFiatList, setSellDefaultFiatList] = useState<IRampFiatItem[]>([]);
  const [sellDefaultFiat, setSellDefaultFiat] = useState<IRampFiatDefault>();

  const refreshSellCrypto = useCallback(async () => {
    const { cryptoList, defaultCrypto } = await getSellCrypto();
    const { sellFiatList, sellDefaultFiat } = await getSellFiat({
      crypto: defaultCrypto.symbol,
      network: defaultCrypto.network,
    });

    setSellCryptoList(cryptoList);
    setSellDefaultCrypto(defaultCrypto);
    setSellDefaultFiatList(sellFiatList);
    setSellDefaultFiat(sellDefaultFiat);
    return {
      sellCryptoList: cryptoList,
      sellDefaultCrypto: defaultCrypto,
      sellDefaultFiatList: sellFiatList,
      sellDefaultFiat,
    };
  }, []);

  return {
    sellCryptoList,
    sellDefaultCrypto,
    sellDefaultFiatList,
    sellDefaultFiat,
    refreshSellCrypto,
  };
};
