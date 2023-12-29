import React, { memo, useCallback, useMemo } from 'react';
import Svg from 'components/Svg';
import { commonButtonStyle } from './style';
import { View, StyleProp, ViewProps } from 'react-native';
import { TextM } from 'components/CommonText';
import { useLanguage } from 'i18n/hooks';
import { pTd } from 'utils/unit';
import GStyles from 'assets/theme/GStyles';
import Touchable from 'components/Touchable';
import { TokenItemShowType } from 'packages/types/types-eoa/token';
import useBaseContainer from 'model/container/UseBaseContainer';
import { PortkeyEntries } from 'config/entries';
import { IToSendHomeParamsType } from 'packages/types/types-ca/routeParams';

interface SendButtonType {
  themeType?: 'dashBoard' | 'tokenInnerPage' | 'nftInnerPage';
  sentToken?: TokenItemShowType;
  wrapStyle?: StyleProp<ViewProps>;
}

const SendButton = (props: SendButtonType) => {
  const { t } = useLanguage();
  const { themeType = 'dashBoard', sentToken, wrapStyle = {} } = props;

  const buttonTitleStyle = useMemo(
    () =>
      themeType === 'dashBoard'
        ? commonButtonStyle.dashBoardTitleColorStyle
        : commonButtonStyle.innerPageTitleColorStyle,
    [themeType],
  );

  const entryName = useMemo(() => {
    if (themeType === 'dashBoard') return PortkeyEntries.ASSETS_HOME_ENTRY;
    if (themeType === 'tokenInnerPage') return PortkeyEntries.TOKEN_DETAIL_ENTRY;
    return PortkeyEntries.NFT_DETAIL_ENTRY;
  }, [themeType]);

  const { navigateTo } = useBaseContainer({
    entryName,
  });

  const onPressButton = useCallback(() => {
    if (themeType !== 'dashBoard') {
      navigateTo<IToSendHomeParamsType>(PortkeyEntries.SEND_TOKEN_HOME_ENTRY, {
        params: {},
      });
    }
    // AssetsOverlay.showAssetList();
  }, [sentToken, themeType]);

  return (
    <View style={[commonButtonStyle.buttonWrap, wrapStyle]}>
      <Touchable style={[commonButtonStyle.iconWrapStyle, GStyles.alignCenter, wrapStyle]} onPress={onPressButton}>
        <Svg icon={themeType === 'dashBoard' ? 'send' : 'send1'} size={pTd(46)} />
      </Touchable>
      <TextM style={[commonButtonStyle.commonTitleStyle, buttonTitleStyle]}>{t('Send')}</TextM>
    </View>
  );
};

export default memo(SendButton);
