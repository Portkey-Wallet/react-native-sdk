import React, { memo, useCallback, useMemo } from 'react';
import Svg from 'components/Svg';
import { commonButtonStyle, dashBoardBtnStyle } from './style';
// import navigationService from 'utils/navigationService';
import { View, TouchableOpacity, StyleProp, ViewProps } from 'react-native';
import { TextM } from 'components/CommonText';
import { useLanguage } from 'i18n/hooks';
import { pTd } from 'utils/unit';
import GStyles from 'assets/theme/GStyles';
import { TokenItemShowType } from 'packages/types/types-eoa/token';
import useBaseContainer from 'model/container/UseBaseContainer';
import { PortkeyEntries } from 'config/entries';
import { IToSendHomeParamsType } from 'packages/types/types-ca/routeParams';
import CommonToast from 'components/CommonToast';

interface SendButtonType {
  themeType?: 'dashBoard' | 'tokenInnerPage' | 'nftInnerPage';
  sentToken?: TokenItemShowType;
  wrapStyle?: StyleProp<ViewProps>;
}

const SendButton = (props: SendButtonType) => {
  const { themeType = 'dashBoard', wrapStyle } = props;
  const styles = themeType === 'dashBoard' ? dashBoardBtnStyle : commonButtonStyle;

  const { t } = useLanguage();

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
  }, [navigateTo, themeType]);

  return (
    <View style={[styles.buttonWrap, wrapStyle]}>
      <TouchableOpacity
        style={[styles.iconWrapStyle, GStyles.alignCenter]}
        onPress={async () => {
          CommonToast.fail('Send is not available by now');
        }}>
        <Svg icon={themeType === 'dashBoard' ? 'send' : 'send1'} size={pTd(46)} />
      </TouchableOpacity>
      <TextM style={[commonButtonStyle.commonTitleStyle, buttonTitleStyle]}>{t('Send')}</TextM>
    </View>
  );
};

export default memo(SendButton);
