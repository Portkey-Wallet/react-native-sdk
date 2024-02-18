import { StyleSheet } from 'react-native';
import { defaultColors } from 'assets/theme';
import React from 'react';
import { FlatList } from 'react-native';
import { TextL } from 'components/CommonText';
import { pTd } from 'utils/unit';
import { useLanguage } from 'i18n/hooks';
import TokenItem from '../TokenItem';
import fonts from 'assets/theme/fonts';
import { TokenItemShowType } from 'packages/types/types-eoa/token';
import { useCurrentNetworkType } from 'model/hooks/network';

interface IPopularTokenSectionProps {
  tokenDataShowInMarket: any[];
  onHandleTokenItem: (item: any, added: boolean) => void;
}

const PopularTokenSection: React.FC<IPopularTokenSectionProps> = (props: IPopularTokenSectionProps) => {
  const { tokenDataShowInMarket, onHandleTokenItem } = props;

  const { t } = useLanguage();

  const currentNetwork = useCurrentNetworkType();

  return (
    <FlatList
      style={pageStyles.list}
      ListHeaderComponent={<TextL style={pageStyles.header}>{t('Popular Assets')}</TextL>}
      data={tokenDataShowInMarket || []}
      renderItem={({ item }: { item: TokenItemShowType }) => (
        <TokenItem
          networkType={currentNetwork}
          item={item}
          onHandleToken={() => onHandleTokenItem(item, !item?.isAdded)}
        />
      )}
      keyExtractor={(item: TokenItemShowType) => item?.id || item?.symbol}
    />
  );
};

export default PopularTokenSection;

export const pageStyles = StyleSheet.create({
  list: {
    flex: 1,
  },
  header: {
    ...fonts.mediumFont,
    paddingLeft: pTd(16),
    paddingTop: pTd(16),
    marginBottom: pTd(8),
  },
  noResult: {
    marginTop: pTd(40),
    textAlign: 'center',
    color: defaultColors.font7,
  },
});
