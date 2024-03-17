import React from 'react';
import { Col, Card, Row } from 'antd';
import CardTitle from './CardTitle';
import MoneyValue from './MoneyValue';
import { handleDatesParameters, getValueByDay, handleValueDayToValueType, getDateTypes } from '../params';
import { WageContext } from '..';
import styles from './components.module.scss';
import { useTranslation } from 'react-i18next';
import { IAppContext, ICurrenciesItem, ICurrencyExchange, IDateType, IWageContext, TCurrencies } from '@/interfaces';
import { AppContext } from '@/pages/_app';

interface Props {
  workHour: number;
  selectedCurrency: ICurrenciesItem;
}

export default function WorkHoursItem({ workHour, selectedCurrency }: Props): JSX.Element {

  const { t } = useTranslation();
  const { currencyState, currencyExchange } = React.useContext(AppContext) as IAppContext;
  const { customHour, monthDays, idealWage, dateType, changeCustomHour } = React.useContext(WageContext) as IWageContext;

  const workHours = workHour || customHour;

  const datesParameters = handleDatesParameters({ monthDays, workHours });

  const valueByDay = getValueByDay({ value: idealWage, monthDays, dateTypeKey: dateType.key, workHours });

  const cardTitle = <CardTitle hour={workHours} custom={!workHour} changeCustomHour={changeCustomHour} />;

  return (
    <Col span={24} sm={12} xxl={6}>
      <Card title={cardTitle} bordered={false} classNames={{ body: styles.WorkHoursItem_Body }}>

        <Row gutter={[8, 8]}>

          {datesParameters.map(({ type }) => {

            const dateTypes = getDateTypes(t);
            const { key: dateTypeKey, title } = dateTypes.find(dt => dt.key === type) as IDateType;

            const value = handleValueDayToValueType({ dateTypeKey, monthDays, value: valueByDay, workHours });

            const [from, to] = [selectedCurrency.key, currencyState.currency.key];
            const currencyRate = convertCurrencyExchange({ from, to, currencyExchange });

            return (
              <MoneyValue
                currencyRate={currencyRate}
                addonBefore={<div className={styles.WorkHoursItem_Currency}>{selectedCurrency.symbol}</div>}
                addonAfter={<div className={styles.WorkHoursItem_Date}>/{title}</div>}
                key={dateTypeKey}
                value={value}
              />
            );
          })}

        </Row>

      </Card>
    </Col>
  );
}

interface IConvertCurrencyFun {
  from: TCurrencies;
  to: TCurrencies;
  currencyExchange: ICurrencyExchange;
}


function convertCurrencyExchange({ from, to, currencyExchange }: IConvertCurrencyFun): number {

  if (from === to) return 1;

  // Obtém as taxas de câmbio das moedas de origem e destino
  const rateFrom = from === 'USD' ? 1 : currencyExchange[from];
  const rateTo = to === 'USD' ? 1 : currencyExchange[to];

  // Calcula a taxa de câmbio e retorna
  return rateFrom / rateTo;
}