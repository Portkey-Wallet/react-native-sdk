import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, Text } from 'react-native';
import PageContainer from 'components/PageContainer';
import { useLanguage } from 'i18n/hooks';
import { TextXL } from 'components/CommonText';
import GStyles from 'assets/theme/GStyles';
import { FontStyles } from 'assets/theme/styles';
import { styles } from './style';
import fonts from 'assets/theme/fonts';
import useBaseContainer from 'model/container/UseBaseContainer';
import { TokenItemShowType } from 'packages/types/types-ca/token';
import { formatChainInfoToShow } from 'packages/utils';
import useEffectOnce from 'hooks/useEffectOnce';
import { NetworkController } from 'network/controller';

interface TokenDetailPageProps {
  tokenInfo: TokenItemShowType;
}

const TokenDetail = ({ tokenInfo }: TokenDetailPageProps) => {
  const { t } = useLanguage();
  const { onFinish } = useBaseContainer({});

  useEffectOnce(async () => {
    const res = await NetworkController.fetchTokenPrices([tokenInfo.symbol]);
    console.log('res', JSON.stringify(res));
  });

  const goBack = useCallback(() => {
    onFinish({
      status: 'success',
    });
  }, [onFinish]);
  return (
    <PageContainer
      type="leftBack"
      backTitle={t('')}
      titleDom={
        <View>
          <TextXL style={[GStyles.textAlignCenter, FontStyles.font2, fonts.mediumFont]}>{tokenInfo.symbol}</TextXL>
          <Text style={[GStyles.textAlignCenter, FontStyles.font2, styles.subTitle]}>
            {formatChainInfoToShow(tokenInfo.chainId)}
          </Text>
        </View>
      }
      safeAreaColor={['blue', 'white']}
      leftCallback={goBack}
      containerStyles={styles.pageWrap}
      scrollViewProps={{ disabled: true }}>
      <View style={styles.card}>
        <Text style={styles.tokenBalance}>{`Title`}</Text>
      </View>
    </PageContainer>
  );
};

export default TokenDetail;
