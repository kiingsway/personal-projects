import React from 'react';
import styles from './WageCalculator.module.scss';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import WorkHoursItem from './components/WorkHoursItem';
import { IAppContext, IDateType, IWageContext, TChangeCustomHour, TCurrencies } from '@/interfaces';
import InputIdealWage from './components/InputIdealWage';
import InputWorkingDays from './components/InputWorkingDays';
import NumberAddon from './components/NumberAddon';
import SelectConvertedCurrencies from './components/SelectConvertedCurrencies';
import { defaultIdealWage, defaultCustomHour, defaultMonthDays, defaultDateType, getDateTypes, workHoursList } from '@/pages-components/WageCalculatorParams';

export const WageContext = React.createContext<IWageContext | undefined>(undefined);

export default function WageCalculator({ currencyState, currencyExchange }: IAppContext): JSX.Element {

  const { t } = useTranslation();

  const [idealWage, setIdealWage] = React.useState(defaultIdealWage);
  const [customHour, setCustomHour] = React.useState(defaultCustomHour);
  const [monthDays, setMonthDays] = React.useState(defaultMonthDays);
  const [dateType, setDateType] = React.useState<IDateType>(defaultDateType(t));
  const [convertedCurrency, setConvertedCurrency] = React.useState<TCurrencies>(currencyState.currency.key);
  const selectedCurrency = currencyState.currenciesItems.find(c => c.key === convertedCurrency) || currencyState.currency;

  const changeConvertedCurrency = (newCurrency: TCurrencies): void => setConvertedCurrency(newCurrency);
  const changeDateType = (newDateType: IDateType): void => setDateType(newDateType);
  const changeCustomHour: TChangeCustomHour = newHour => !newHour ? undefined : setCustomHour(parseInt(String(newHour)));

  function handleInputNumber(newValue: string | number | null, setState: React.Dispatch<React.SetStateAction<number>>): void {
    const val = parseFloat(String(newValue));
    if (val) setState(val);
  }

  return (
    <WageContext.Provider value={{ monthDays, customHour, changeCustomHour, dateType, dateTypes: getDateTypes(t), idealWage, changeDateType }}>
      <Row gutter={[20, 20]} className={styles.Main}>
        <Col span={24} className={styles.Main_Header}>

          <InputIdealWage
            value={idealWage}
            placeholder={t('IdealWage')}
            addonBefore={currencyState.currency.symbol}
            onChange={newVal => !newVal ? undefined : handleInputNumber(newVal, setIdealWage)}
            addonAfter={<NumberAddon dateType={dateType} changeDateType={changeDateType} />}
          />

          <InputWorkingDays
            addonAfter={`${t('WorkingDays')}/${t('Month')}`}
            onChange={newVal => !newVal ? undefined : handleInputNumber(newVal, setMonthDays)} monthDays={monthDays} />

        </Col>

        <Col span={24} className={styles.Main_Header}>
          <SelectConvertedCurrencies value={convertedCurrency} onChange={changeConvertedCurrency} currencyState={currencyState} />
        </Col>

        {workHoursList.map(workHour => (
          <WorkHoursItem
            key={workHour}
            workHour={workHour}
            selectedCurrency={selectedCurrency}
            currencyState={currencyState}
            currencyExchange={currencyExchange}
            customHour={customHour}
            monthDays={monthDays}
            idealWage={idealWage}
            dateType={dateType}
            changeCustomHour={changeCustomHour} />
        ))}

      </Row>
    </WageContext.Provider>
  );
}



