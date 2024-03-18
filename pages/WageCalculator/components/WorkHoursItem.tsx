import React from 'react';
import { Col, Card, Row } from 'antd';
import CardTitle from './CardTitle';
import MoneyValue from './MoneyValue';
import styles from './components.module.scss';
import { useTranslation } from 'react-i18next';
import { ICurrenciesItem, ICurrencyExchange, IDateType, IUseCurrencies, TChangeCustomHour, TCurrencies } from '@/interfaces';
import { handleDatesParameters, getValueByDay, getDateTypes, handleValueDayToValueType } from '@/pages-components/WageCalculatorParams';

interface Props {
  workHour: number;
  selectedCurrency: ICurrenciesItem;
  currencyState: IUseCurrencies;
  currencyExchange: ICurrencyExchange;
  customHour: number;
  monthDays: number;
  idealWage: number;
  dateType: IDateType;
  changeCustomHour: TChangeCustomHour;
}

export default function WorkHoursItem(p: Props): JSX.Element {

  const { workHour, selectedCurrency, currencyState, currencyExchange, changeCustomHour, customHour, dateType, idealWage, monthDays } = p;
  const { t } = useTranslation();

  const workHours = workHour || customHour;

  const datesParameters = handleDatesParameters({ monthDays, workHours });

  const valueByDay = getValueByDay({ value: idealWage, monthDays, dateTypeKey: dateType.key, workHours });

  const cardTitle = <CardTitle hour={workHours} custom={!workHour} changeCustomHour={changeCustomHour} />;

  return (
    <Col span={24} sm={12}>
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