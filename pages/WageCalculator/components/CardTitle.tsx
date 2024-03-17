import { InputNumber } from 'antd';
import React from 'react';
import styles from './components.module.scss';
import { inputNumberProps } from '../params';
import { useTranslation } from 'react-i18next';

interface Props {
  hour: number;
  custom?: boolean;
  // eslint-disable-next-line no-unused-vars
  changeCustomHour: (newHour?: number | string | null) => void;
}

export default function CardTitle({ custom, hour, changeCustomHour }: Props): JSX.Element {

  const { t } = useTranslation();

  return (
    <div className={styles.CardTitle}>
      <div className={styles.CardTitle_Header}>
        {!custom ? <span>{hour}</span> : (
          <InputNumber
            {...inputNumberProps('int')}
            variant="filled"
            className={styles.CardTitle_Header_Input}
            min={1}
            max={16}
            value={hour}
            onChange={changeCustomHour} />
        )}
        <span>{t('Hour', { count: hour })}/{t('Day')}</span>
      </div>
      <small>{hour * 5} {t('Hour', { count: hour * 5 })}/{t('Week')}</small>
    </div>
  );
}