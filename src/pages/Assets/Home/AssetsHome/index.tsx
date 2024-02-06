import React, { useMemo } from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewProps } from 'react-native';
import { styles } from './style';
import ReceiveButton from 'components/ReceiveButton';
import { TextM } from 'components/CommonText';
import FaucetButton from 'components/FaucetButton';
import { useUnlockedWallet } from 'model/wallet';
import { useCurrentNetworkType } from 'model/hooks/network';
import SendButton from 'components/SendButton';
import DashBoardTab from '../DashBoardTab';
import { useAccountTokenBalanceList, useSearchTokenList, useNftCollections } from 'model/hooks/balance';
import CustomHeader from 'components/CustomHeader';
import useBaseContainer from 'model/container/UseBaseContainer';
import AssetsContext, { AssetsContextType } from 'global/context/assets/AssetsContext';
import BigNumber from 'bignumber.js';
import { ZERO } from 'packages/constants/misc';
import { PortkeyEntries } from 'config/entries';
import ActivityButton from '../ActivityButton';
import { defaultColors } from 'assets/theme';
import CommonSvg from 'components/Svg';
import DepositButton from 'components/DepositButton';
import { DepositItem, useDepositList } from 'hooks/deposit';
import { isIOS } from 'packages/utils/mobile/device';

const style = StyleSheet.create({
  scanQrCode: {
    // paddingBottom: 0,
  },
});

const AssetsHome: React.FC = () => {
  const { wallet } = useUnlockedWallet();
  const networkType = useCurrentNetworkType();
  const { balanceList, updateBalanceList } = useAccountTokenBalanceList();
  const { tokenList, updateTokensList } = useSearchTokenList();
  const { nftCollections, updateNftCollections } = useNftCollections();
  const balanceUSD = useMemo(() => {
    return balanceList.reduce((acc, item) => {
      const fixedBalance = Number(item.balanceInUsd).toFixed(2);
      return BigNumber(fixedBalance).plus(acc);
    }, ZERO);
  }, [balanceList]);

  const assetsContext: AssetsContextType = {
    balanceUSD,
    balanceList,
    updateBalanceList,
    allOfTokensList: tokenList,
    updateTokensList,
    nftCollections,
    updateNftCollections,
  };

  const isMainnet = networkType === 'MAIN';

  const { onFinish, navigateTo } = useBaseContainer({
    entryName: PortkeyEntries.ASSETS_HOME_ENTRY,
  });
  const depositList = useDepositList();
  const isDepositShow = depositList && depositList.length > 0;
  let buttonCount = 3;
  if (isDepositShow) buttonCount++;
  // FaucetButton
  if (!isMainnet) buttonCount++;

  const buttonWrapStyle = buttonCount < 5 ? (styles.buttonWrapStyle1 as StyleProp<ViewProps>) : undefined;
  const statusBarProps = useMemo(() => {
    const barProps: StatusBarProps = { barStyle: 'light-content' };
    if (!isIOS) {
      barProps.translucent = true;
      barProps.backgroundColor = 'transparent';
    }
    return barProps;
  }, []);
  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ width: '100%', height: '100%', backgroundColor: '#5B8EF4' }}
      edges={['top', 'bottom', 'right', 'left']}
      mode="padding">
      <StatusBar {...statusBarProps} />
      <AssetsContext.Provider value={assetsContext}>
        <View style={[styles.cardWrap, styles.pagePaddingTop]}>
          <CustomHeader
            themeType={'blue'}
            titleDom={''}
            rightDom={
              <TouchableOpacity
                style={[styles.svgWrap, style.scanQrCode]}
                onPress={() => {
                  navigateTo(PortkeyEntries.SCAN_QR_CODE);
                }}>
                <CommonSvg icon="scan" size={22} color={defaultColors.font2} />
              </TouchableOpacity>
            }
            leftCallback={() => {
              onFinish({
                status: 'success',
                data: {
                  finished: true,
                },
              });
            }}
          />
          <Text style={styles.usdtBalance}>{isMainnet ? `$${balanceUSD.toFixed(2)}` : 'Dev Mode'}</Text>
          <TextM style={styles.accountName}>{wallet?.name}</TextM>
          <View style={styles.buttonGroupWrap}>
            {/* ramp is now available by now */}
            {/* {isBuyButtonShow && (
            <>
              <BuyButton themeType="dashBoard" />
              <View style={styles.spacerStyle} />
            </>
          )} */}
            {isDepositShow && <DepositButton wrapStyle={buttonWrapStyle} list={depositList as DepositItem[]} />}
            <SendButton wrapStyle={buttonWrapStyle} themeType="dashBoard" />
            {/* <View style={styles.spacerStyle} /> */}
            <ReceiveButton wrapStyle={buttonWrapStyle} themeType="dashBoard" />
            {!isMainnet && (
              <>
                {/* <View style={styles.spacerStyle} /> */}
                <FaucetButton wrapStyle={buttonWrapStyle} themeType="dashBoard" />
              </>
            )}
            {/* <View style={styles.spacerStyle} /> */}
            <ActivityButton
              wrapStyle={buttonWrapStyle}
              themeType="dashBoard"
              entryName={PortkeyEntries.ASSETS_HOME_ENTRY}
            />
          </View>
        </View>
        <DashBoardTab />
      </AssetsContext.Provider>
    </SafeAreaView>
  );
};

export default AssetsHome;
