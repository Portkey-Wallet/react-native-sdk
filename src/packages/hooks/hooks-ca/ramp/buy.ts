import { useCallback, useState } from 'react';
import { IRampCryptoDefault, IRampCryptoItem, IRampFiatDefault, IRampFiatItem } from 'packages/ramp';
import { getBuyCrypto, getBuyFiat } from 'packages/utils/ramp';

export const useBuyFiat = () => {
  const [buyFiatList, setBuyFiatList] = useState<IRampFiatItem[]>([]);
  const [buyDefaultFiat, setBuyDefaultFiat] = useState<IRampFiatDefault>();
  const [buyDefaultCryptoList, setBuyDefaultCryptoList] = useState<IRampCryptoItem[]>([]);
  const [buyDefaultCrypto, setBuyDefaultCrypto] = useState<IRampCryptoDefault>();

  const refreshBuyFiat = useCallback(async () => {
    const { fiatList, defaultFiat } = await getBuyFiat();
    const { buyCryptoList, buyDefaultCrypto } = await getBuyCrypto({
      fiat: defaultFiat.symbol,
      country: defaultFiat.country,
    });

    setBuyFiatList(fiatList);
    setBuyDefaultFiat(defaultFiat);
    setBuyDefaultCryptoList(buyCryptoList);
    setBuyDefaultCrypto(buyDefaultCrypto);

    return {
      buyFiatList: fiatList,
      buyDefaultFiat: defaultFiat,
      buyDefaultCryptoList: buyCryptoList,
      buyDefaultCrypto,
    };
  }, []);

  return {
    buyDefaultFiat,
    buyFiatList,
    buyDefaultCryptoList,
    buyDefaultCrypto,
    refreshBuyFiat,
  };
};
