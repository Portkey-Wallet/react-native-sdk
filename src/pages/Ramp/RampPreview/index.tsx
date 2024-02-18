import { defaultColors } from 'assets/theme';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { pTd } from 'utils/unit';
import PageContainer from 'components/PageContainer';
import GStyles from 'assets/theme/GStyles';
import { TextM, TextS } from 'components/CommonText';
import fonts from 'assets/theme/fonts';
import { FontStyles } from 'assets/theme/styles';
import CommonButton from 'components/CommonButton';
import ActionSheet from 'components/ActionSheet';
// import useRouterParams from '@portkey-wallet/hooks/useRouterParams';
import { useReceive } from '../hooks';
// import navigationService from 'utils/navigationService';
import CommonToast from 'components/CommonToast';
import Loading from 'components/Loading';
import ramp, {
  IBuyProviderPrice,
  IRampCryptoItem,
  IRampFiatItem,
  IRampProviderInfo,
  IRampProviderType,
  ISellProviderPrice,
  RampType,
} from 'packages/ramp';
import CommonAvatar from 'components/CommonAvatar';
import Svg from 'components/Svg';
import Touchable from 'components/Touchable';
import { LoginType } from 'packages/types/types-ca/wallet';
import { RAMP_BUY_URL, RAMP_SELL_URL } from '../constants';
import { checkIsSvgUrl } from 'utils/commonUtil';
import { Image } from 'react-native';
import { formatAmountShow } from 'packages/utils/converter';
import { GuardiansApprovedType } from 'packages/types/types-ca/routeParams';
import { MAIN_CHAIN_ID } from 'packages/constants/constants-ca/activity';
// import { useAppRampEntryShow } from 'hooks/ramp';
import useEffectOnce from 'hooks/useEffectOnce';
import useBaseContainer from 'model/container/UseBaseContainer';
import { PortkeyEntries } from 'config/entries';
import { useSDKRampEntryShow, useCurrentWalletInfo, useDefaultToken, useGuardiansInfo } from './hook';
import { t } from 'i18next';
import { getBottomSpace } from 'utils/screen';

interface RouterParams {
  type?: RampType;
  crypto?: IRampCryptoItem;
  fiat?: IRampFiatItem;
  amount?: string;
  rate?: string;
  guardiansApproved?: GuardiansApprovedType[];
}

type ImageSizeType = {
  w?: number;
  h?: number;
  isSvg: boolean;
};

const ProviderImageHeight = pTd(24);
const ProviderSvgWidth = pTd(120);

const renderProviderCard = (
  crypto: IRampCryptoItem | undefined,
  fiat: IRampFiatItem | undefined,
  item: IBuyProviderPrice | ISellProviderPrice,
  currentProviderKey: string | undefined,
  size?: ImageSizeType,
) => {
  const isActive = currentProviderKey === item.providerInfo.key;

  return (
    <View style={[styles.providerWrap, isActive && styles.providerActiveStyle]}>
      {isActive && (
        <View style={styles.providerActiveTagWrap}>
          <Svg oblongSize={[pTd(9), pTd(7)]} icon="selected4" />
        </View>
      )}
      <View style={[GStyles.flexRow, GStyles.spaceBetween, GStyles.itemCenter, GStyles.marginBottom(24)]}>
        <View style={styles.logoWrap}>
          {size && (
            <CommonAvatar
              width={size.isSvg ? ProviderSvgWidth : size.w}
              height={size.h || ProviderImageHeight}
              shapeType={'square'}
              preserveAspectRatio="xMinYMid meet"
              style={styles.imgStyle}
              imageUrl={item.providerInfo.logo}
            />
          )}
        </View>
        <TextM style={FontStyles.font3}>{`1 ${crypto?.symbol || ''} ≈ ${item.exchange} ${fiat?.symbol}`}</TextM>
      </View>
      <View style={GStyles.flexRow}>
        {item.providerInfo.paymentTags.map((iconUrl, idx) => (
          <View key={idx} style={styles.iconWrap}>
            <CommonAvatar
              width={pTd(32)}
              height={pTd(16)}
              shapeType={'square'}
              style={styles.imgStyle}
              imageUrl={iconUrl || ''}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default function RampPreview(props: RouterParams) {
  const { type = RampType.BUY, crypto, fiat, amount, rate: rateProps, guardiansApproved } = props;
  const { onFinish, navigateTo } = useBaseContainer({ entryName: PortkeyEntries.RAMP_PREVIEW_ENTRY });
  const defaultToken = useDefaultToken(MAIN_CHAIN_ID);
  const { providerPriceList, refreshReceive } = useReceive({
    type,
    amount: amount || '',
    fiat,
    crypto,
    initialRate: rateProps,
    isProviderShow: true,
  });
  const isBuy = useMemo(() => type === RampType.BUY, [type]);
  const wallet = useCurrentWalletInfo();
  const [providerKey, setProviderKey] = useState<string>();
  const { refreshRampShow } = useSDKRampEntryShow();
  const { userGuardiansList } = useGuardiansInfo();

  useEffectOnce(() => {
    refreshReceive();
  });

  useEffect(() => {
    if (!providerPriceList.length) {
      setProviderKey(undefined);
      return;
    }
    setProviderKey(pre => {
      if (pre) {
        const preProvider = (providerPriceList as Array<any>).find(item => item.providerInfo.key === pre);
        if (preProvider) return pre;
      }
      return providerPriceList[0].providerInfo.key;
    });
  }, [providerPriceList]);

  const onProviderChange = useCallback((provider: IRampProviderInfo) => {
    setProviderKey(provider.key);
  }, []);

  const currentProvider = useMemo(
    () => (providerPriceList as Array<any>).find(item => item.providerInfo.key === providerKey),
    [providerKey, providerPriceList],
  );

  const [providerImageSizeMap, setProviderImageSizeMap] = useState<Record<string, ImageSizeType>>({});
  const providerImageSizeMapRef = useRef(providerImageSizeMap);
  providerImageSizeMapRef.current = providerImageSizeMap;
  useEffect(() => {
    const _providerImageSizeMap = providerImageSizeMapRef.current;
    providerPriceList.forEach(item => {
      const key = item?.providerInfo?.key;
      const logo = item?.providerInfo?.logo;
      if (!key || !logo || _providerImageSizeMap[key]) return;
      if (checkIsSvgUrl(logo)) {
        setProviderImageSizeMap(pre => ({
          ...pre,
          [key]: {
            isSvg: true,
          },
        }));
        return;
      }
      Image.getSize(logo, (w, h) => {
        setProviderImageSizeMap(pre => ({
          ...pre,
          [key]: {
            w: (w / h) * ProviderImageHeight,
            h: ProviderImageHeight,
            isSvg: false,
          },
        }));
      });
    });
  }, [providerPriceList]);

  const goPayPage = useCallback(async () => {
    if (!providerKey || !amount || !fiat || !crypto) return;

    try {
      const provider = ramp.getProvider(providerKey as IRampProviderType);
      if (!provider) throw new Error('Failed to get ramp provider');

      const emailGuardian = userGuardiansList?.find(
        item => item.guardianType === LoginType.Email && item.isLoginAccount,
      );

      Loading.show();
      const showResult = await refreshRampShow();
      const isSectionShow = type === RampType.BUY ? showResult.isBuySectionShow : showResult.isSellSectionShow;
      if (!isSectionShow) {
        CommonToast.fail('Sorry, the service you are using is temporarily unavailable.');
        // navigationService.navigate('Tab');
        onFinish({
          data: { finish: true },
          status: 'success',
        });
        Loading.hide();
        return;
      }

      const { url, orderId } = await provider.createOrder({
        type,
        address: wallet?.AELF?.caAddress || '',
        email: emailGuardian?.guardianAccount,
        crypto: currentProvider?.providerSymbol || crypto.symbol || '',
        network: currentProvider?.providerNetwork || '',
        country: fiat.country || '',
        fiat: fiat.symbol || '',
        amount: amount,
        withdrawUrl: type === RampType.BUY ? RAMP_BUY_URL : RAMP_SELL_URL,
      });
      console.log('url', url);
      console.log('orderId', orderId);
      navigateTo(PortkeyEntries.VIEW_ON_WEBVIEW, {
        params: {
          title: t('Ramp'),
          url: url,
          webViewPageType: type === RampType.BUY ? 'ramp-buy' : 'ramp-sell',
          injectedJavaScript: undefined,
          params:
            type === RampType.BUY
              ? undefined
              : {
                  orderId,
                  guardiansApproved,
                },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  }, [
    amount,
    crypto,
    currentProvider?.providerNetwork,
    currentProvider?.providerSymbol,
    fiat,
    guardiansApproved,
    navigateTo,
    onFinish,
    providerKey,
    refreshRampShow,
    type,
    userGuardiansList,
    wallet?.AELF?.caAddress,
  ]);

  const receiveAmount = useMemo(() => {
    if (!currentProvider) return '';
    return isBuy
      ? (currentProvider as IBuyProviderPrice).cryptoAmount
      : (currentProvider as ISellProviderPrice).fiatAmount;
  }, [currentProvider, isBuy]);

  return (
    <PageContainer
      safeAreaColor={['blue', 'white']}
      titleDom={`${isBuy ? 'Buy' : 'Sell'} ${defaultToken.symbol} `}
      containerStyles={styles.pageWrap}
      scrollViewProps={{ disabled: true }}>
      <View>
        <View style={styles.amountContainer}>
          <View style={styles.primaryWrap}>
            <Text style={styles.primaryAmount}>{formatAmountShow(amount || '', 4)}</Text>
            <TextM style={styles.primaryUnit}>{isBuy ? fiat?.symbol || '' : crypto?.symbol || ''}</TextM>
          </View>
          <TextM style={FontStyles.font3}>
            I will receive {receiveAmount} {isBuy ? crypto?.symbol || '' : fiat?.symbol || ''}
          </TextM>
        </View>

        <TextS style={styles.serviceLabel}>Service provider</TextS>
        {providerPriceList.map((item, idx) => (
          <Touchable
            onPress={() => {
              onProviderChange(item.providerInfo);
            }}
            key={idx}>
            {renderProviderCard(crypto, fiat, item, providerKey, providerImageSizeMap[item?.providerInfo?.key || ''])}
          </Touchable>
        ))}
      </View>
      <View>
        {currentProvider && (
          <>
            <TextM style={GStyles.marginBottom(26)}>
              Proceeding with this transaction means that you have read and understood{' '}
              <TextM
                style={FontStyles.font4}
                onPress={() => {
                  ActionSheet.alert({
                    title: 'Disclaimer',
                    title2: (
                      <TextM style={[FontStyles.font3, GStyles.textAlignCenter, GStyles.marginBottom(20)]}>
                        {`${currentProvider.providerInfo.name} is a fiat-to-crypto platform independently operated by a third-party entity. Portkey shall not be held liable for any losses or damages suffered as a result of using ${currentProvider.providerInfo.name} services.`}
                      </TextM>
                    ),
                    buttons: [{ title: 'OK' }],
                  });
                }}>
                the Disclaimer
              </TextM>
              .
            </TextM>
            <CommonButton
              type="primary"
              disabled={!providerKey}
              onPress={() => {
                goPayPage();
              }}>
              {`Go to ${currentProvider?.providerInfo.name}`}
            </CommonButton>
          </>
        )}
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  pageWrap: {
    flex: 1,
    backgroundColor: defaultColors.bg1,
    justifyContent: 'space-between',
    ...GStyles.paddingArg(60, 20, 16, 20),
    paddingBottom: getBottomSpace(),
  },
  amountContainer: {
    marginBottom: pTd(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryWrap: {
    marginBottom: pTd(12),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  primaryAmount: {
    fontSize: pTd(30),
    lineHeight: pTd(34),
    marginRight: pTd(8),
    color: defaultColors.font5,
    ...fonts.mediumFont,
  },
  primaryUnit: {
    ...fonts.mediumFont,
    marginBottom: pTd(4),
  },
  serviceLabel: {
    marginLeft: pTd(8),
    marginBottom: pTd(8),
  },
  providerWrap: {
    borderRadius: pTd(6),
    borderColor: defaultColors.border6,
    borderWidth: pTd(1),
    overflow: 'hidden',
    marginBottom: pTd(12),
    ...GStyles.paddingArg(16, 12),
  },
  providerActiveStyle: {
    borderColor: defaultColors.border3,
  },
  providerActiveTagWrap: {
    width: pTd(24),
    height: pTd(18),
    backgroundColor: defaultColors.bg5,
    borderBottomLeftRadius: pTd(6),
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  logoWrap: {
    width: pTd(120),
    height: pTd(24),
    marginRight: pTd(16),
  },
  iconWrap: {
    width: pTd(36),
    height: pTd(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pTd(2),
    borderWidth: 1,
    borderColor: defaultColors.border6,
    marginRight: pTd(6),
  },
});
