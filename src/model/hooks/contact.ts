import useEffectOnce from 'hooks/useEffectOnce';
import { getUnlockedWallet } from 'model/wallet';
import { NetworkController } from 'network/controller';
import { GetContractListApiType, RecentContactItemType, RecentTransactionResponse } from 'network/dto/query';
import { useCallback, useMemo, useState } from 'react';

export const useContact = () => {
  const [contact, setContact] = useState<GetContractListApiType>({
    totalCount: 0,
    items: [],
  });
  useEffectOnce(async () => {
    const result = await NetworkController.getContractInfo();
    result && setContact(result);
  });
  return contact;
};

export const useRecent = (removeDuplicateResult = true) => {
  const [recent, setRecent] = useState<RecentTransactionResponse & RefreshHandler>({
    totalRecordCount: 0,
    data: [],
    skipCount: 0,
  });
  const filteredRecent = useMemo(() => {
    return {
      ...recent,
      data: removeDuplicateResult
        ? sortByFirstLetter(
            recent.data.filter((item, index, array) => array.findIndex(i => i.address === item.address) === index),
          )
        : sortByFirstLetter(recent.data),
    };
  }, [recent, removeDuplicateResult]);
  const loadMoreRecent = useCallback(
    async (reset = false) => {
      const { skipCount, data: originData, totalRecordCount: pastTotalRecordCount } = recent;
      if (pastTotalRecordCount > 0 && originData.length >= pastTotalRecordCount) return;
      const { multiCaAddresses } = await getUnlockedWallet({ getMultiCaAddresses: true });
      const result = await NetworkController.getRecentTransactionInfo({
        caAddressInfos: Object.entries(multiCaAddresses).map(([chainId, caAddress]) => ({
          chainId,
          caAddress,
        })),
        skipCount: reset ? 0 : skipCount,
        maxResultCount: 100,
      });
      const { data, totalRecordCount } = result;
      if (reset) {
        setRecent({
          totalRecordCount,
          data,
          skipCount: data.length,
        });
      } else {
        setRecent({
          data: originData.concat(data),
          totalRecordCount,
          skipCount: skipCount + data.length,
        });
      }
    },
    [recent],
  );
  return { recent: filteredRecent, loadMoreRecent };
};

const sortByFirstLetter = (list: Array<RecentContactItemType>) => {
  return list.sort((a, b) => {
    const aName = a.name[0].toLowerCase();
    const bName = b.name[0].toLowerCase();
    return aName.localeCompare(bName);
  });
};

export interface RefreshHandler {
  skipCount: number;
}
