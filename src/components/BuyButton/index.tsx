import React, { memo, useMemo } from 'react';
import Svg from 'components/Svg';

import { View, StyleProp, ViewProps } from 'react-native';
import { TextM } from 'components/CommonText';
import { useLanguage } from 'i18n/hooks';
import { pTd } from 'utils/unit';
import GStyles from 'assets/theme/GStyles';
import { useCurrentNetworkType } from 'model/hooks/network';
import { commonButtonStyle } from '../SendButton/style';
import Touchable from 'components/Touchable';
import { dashBoardBtnStyle, innerPageStyles } from '../SendButton/style';

interface SendButtonType {
  themeType?: 'dashBoard' | 'innerPage';
  wrapStyle?: StyleProp<ViewProps>;
}

const BuyButton = (props: SendButtonType) => {
  const { themeType = 'dashBoard', wrapStyle = {} } = props;
  const isMainnet = useCurrentNetworkType() === 'MAIN';
  const { t } = useLanguage();

  const buttonTitleStyle = useMemo(
    () =>
      themeType === 'dashBoard'
        ? commonButtonStyle.dashBoardTitleColorStyle
        : commonButtonStyle.innerPageTitleColorStyle,
    [themeType],
  );

  const styles = themeType === 'dashBoard' ? dashBoardBtnStyle : innerPageStyles;

  return (
    <View style={[styles.buttonWrap, wrapStyle]}>
      <Touchable
        style={[styles.iconWrapStyle, GStyles.alignCenter]}
        onPress={async () => {
          if (!isMainnet) return;
          // todo_wade: navigate to buy page
          // navigationService.navigate('BuyHome');
        }}>
        <Svg icon={themeType === 'dashBoard' ? 'buy' : 'buy1'} size={pTd(46)} />
      </Touchable>
      <TextM style={[commonButtonStyle.commonTitleStyle, buttonTitleStyle]}>{t('Buy')}</TextM>
    </View>
  );
};

export default memo(BuyButton);
