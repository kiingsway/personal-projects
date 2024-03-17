import { Col, InputNumber } from 'antd';
import React from 'react';
import styles from './components.module.scss';
import { inputNumberProps } from '@/pages-components/WageCalculatorParams';

interface Props {
  value: number;
  addonAfter?: React.ReactNode;
  currencyRate: number;
  addonBefore: React.ReactNode;
}

export default function MoneyValue({ currencyRate, addonBefore, value, addonAfter }: Props): JSX.Element {

  const val = value * Math.max(currencyRate, 0.01);

  return (
    <Col span={24}>
      <InputNumber
        {...inputNumberProps('float')}
        addonAfter={addonAfter}
        value={val}
        addonBefore={addonBefore}
        className={styles.MoneyValue}
        readOnly
        variant='borderless'
        style={{ width: '100%' }}
      />
    </Col>
  );
}