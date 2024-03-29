import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useLanguage } from 'i18n/hooks';
import Touchable from 'components/Touchable';
import CommonInput, { CommonInputProps } from 'components/CommonInput';
import { CountryItem } from 'packages/types/types-ca/country';
import { pTd } from 'utils/unit';

import CommonSvg from 'components/Svg';
import { defaultColors } from 'assets/theme';
import { TextM } from 'components/CommonText';
import { EntryResult, RouterOptions } from 'service/native-modules';
import { PortkeyEntries } from 'config/entries';
import { SelectCountryResult } from 'pages/Login/SelectCountry';
import { AcceptableValueType } from 'model/container/BaseContainer';
import { useInputFocus } from 'hooks/useInputFocus';

interface PhoneInputProps extends CommonInputProps {
  selectCountry?: CountryItem;
  onCountryChange?: (country: CountryItem) => void;
  navigateForResult: <V, T = { [x: string]: AcceptableValueType }>(
    entry: PortkeyEntries,
    options: RouterOptions<T>,
    callback: (res: EntryResult<V>) => void,
  ) => void;
}

export default function PhoneInput({
  selectCountry,
  onCountryChange,
  navigateForResult,
  ...inputProps
}: PhoneInputProps) {
  const { t } = useLanguage();
  const iptRef = useRef<any>();
  useInputFocus(iptRef);

  const pushToSelectCountry = () => {
    navigateForResult<SelectCountryResult>(
      PortkeyEntries.SELECT_COUNTRY_ENTRY,
      { selectCountry: JSON.stringify(selectCountry) } as any,
      res => {
        const { result } = res.data || {};
        if (result) {
          try {
            const country = JSON.parse(result);
            onCountryChange?.(country);
          } catch (ignored) {}
        }
      },
    );
  };

  return (
    <CommonInput
      ref={iptRef}
      leftIcon={
        <Touchable style={inputStyles.countryRow} onPress={pushToSelectCountry}>
          <TextM>+ {selectCountry?.code}</TextM>
          <CommonSvg color={defaultColors.font3} size={12} icon="down-arrow" />
        </Touchable>
      }
      type="general"
      maxLength={30}
      autoCorrect={false}
      keyboardType="number-pad"
      placeholder={t('Enter Phone Number')}
      {...inputProps}
    />
  );
}

export const inputStyles = StyleSheet.create({
  countryRow: {
    height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRightColor: defaultColors.border6,
    borderRightWidth: StyleSheet.hairlineWidth,
    marginLeft: pTd(16),
    paddingRight: pTd(10),
    width: pTd(68),
    justifyContent: 'space-between',
  },
});
