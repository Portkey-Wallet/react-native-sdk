import PageContainer from 'components/PageContainer';
import CommonInput from 'components/CommonInput';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import gStyles from 'assets/theme/GStyles';
import { defaultColors } from 'assets/theme';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CommonToast from 'components/CommonToast';
import { useLanguage } from 'i18n/hooks';
import useDebounce from 'hooks/useDebounce';
import Loading from 'components/Loading';
import FilterTokenSection from '../components/FilterToken';
import PopularTokenSection from '../components/PopularToken';
import { pTd } from 'utils/unit';
import Svg from 'components/Svg';
import { request } from 'packages/api/api-did';
import { useAppCommonDispatch, useAppCASelector } from 'packages/hooks';
import { fetchAllTokenListAsync } from 'packages/store/store-ca/tokenManagement/action';
import { fetchTokenListAsync } from 'packages/store/token/slice';
import { TokenItemShowType } from 'packages/types/types-eoa/token';

interface ManageTokenListProps {
  route?: any;
}
const ManageTokenList: React.FC<ManageTokenListProps> = () => {
  const { t } = useLanguage();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const chainIdList = useChainIdList();

  const dispatch = useAppCommonDispatch();
  const caAddressArray = useCaAddresses();
  const caAddressInfos = useCaAddressInfoList();

  const { tokenDataShowInMarket } = useAppCASelector(state => state.tokenManagement);

  const [keyword, setKeyword] = useState<string>('');
  const [filterTokenList, setFilterTokenList] = useState<TokenItemShowType[]>([]);

  const debounceWord = useDebounce(keyword, 800);

  const fetchSearchedTokenList = useCallback(async () => {
    try {
      if (!debounceWord) return;
      setIsSearching(true);

      const list = await request.token.fetchTokenListBySearch({
        params: {
          symbol: debounceWord,
          chainIds: chainIdList,
        },
      });

      const tmpToken: TokenItemShowType[] = list.map((item: any) => ({
        ...item,
        isAdded: item.isDisplay,
        userTokenId: item.id,
      }));
      setFilterTokenList(tmpToken);
    } catch (error) {
      CommonToast.failError(error);
    } finally {
      setIsSearching(false);
    }
  }, [chainIdList, debounceWord]);

  const onHandleTokenItem = useCallback(
    async (item: TokenItemShowType, isDisplay: boolean) => {
      Loading.showOnce();

      try {
        await request.token.displayUserToken({
          resourceUrl: `${item.userTokenId}/display`,
          params: {
            isDisplay,
          },
        });
        timerRef.current = setTimeout(async () => {
          dispatch(fetchTokenListAsync({ caAddresses: caAddressArray, caAddressInfos }));
          if (debounceWord) {
            await fetchSearchedTokenList();
          } else {
            await dispatch(fetchAllTokenListAsync({ keyword: '', chainIdArray: chainIdList }));
          }
          Loading.hide();
          CommonToast.success('Success');
        }, 800);
      } catch (err) {
        Loading.hide();
        CommonToast.failError(err);
      }
    },
    [caAddressArray, caAddressInfos, chainIdList, debounceWord, dispatch, fetchSearchedTokenList],
  );

  useFocusEffect(
    useCallback(() => {
      fetchSearchedTokenList();
      dispatch(fetchAllTokenListAsync({ chainIdArray: chainIdList }));
    }, [chainIdList, dispatch, fetchSearchedTokenList]),
  );

  useEffect(() => {
    if (tokenDataShowInMarket.length) return;
    dispatch(fetchAllTokenListAsync({ keyword: debounceWord, chainIdArray: chainIdList }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (debounceWord) {
      // get filter token
      setFilterTokenList([]);
      fetchSearchedTokenList();
    } else {
      dispatch(fetchAllTokenListAsync({ chainIdArray: chainIdList }));
    }
  }, [chainIdList, debounceWord, dispatch, fetchSearchedTokenList]);

  // clear timer
  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [],
  );

  const RightDom = useMemo(
    () => (
      <TouchableOpacity
        style={pageStyles.rightIconStyle}
        onPress={() => {
          navigationService.navigate('CustomToken');
        }}>
        <Svg icon="add1" size={pTd(20)} color={defaultColors.font2} />
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <PageContainer
      titleDom={t('Add Tokens')}
      safeAreaColor={['blue', 'white']}
      rightDom={RightDom}
      containerStyles={pageStyles.pageWrap}
      scrollViewProps={{ disabled: true }}>
      <View style={pageStyles.inputWrap}>
        <CommonInput
          allowClear
          loading={isSearching}
          value={keyword}
          placeholder={t('Token Name')}
          onChangeText={v => {
            setKeyword(v.trim());
          }}
        />
      </View>

      {debounceWord ? (
        <FilterTokenSection tokenList={filterTokenList} onHandleTokenItem={onHandleTokenItem} />
      ) : (
        <PopularTokenSection tokenDataShowInMarket={tokenDataShowInMarket} onHandleTokenItem={onHandleTokenItem} />
      )}
    </PageContainer>
  );
};

export default ManageTokenList;

export const pageStyles = StyleSheet.create({
  pageWrap: {
    flex: 1,
    ...gStyles.paddingArg(0),
  },
  inputWrap: {
    backgroundColor: defaultColors.bg5,
    ...gStyles.paddingArg(8, 20, 8),
  },
  list: {
    flex: 1,
  },
  loadingIcon: {
    width: pTd(20),
  },
  rightIconStyle: {
    padding: pTd(16),
  },
});
