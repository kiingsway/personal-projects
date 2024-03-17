import { IWageContext, TDateTypes } from "@/interfaces";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { WageContext } from "..";
import { getDateTypes } from "../params";
import { useContext } from "react";
import styles from '../WageCalculator.module.scss';

const NumberAddon = (): JSX.Element => {

  const { t } = useTranslation();
  const { dateType, changeDateType } = useContext(WageContext) as IWageContext;

  const dateTypes = getDateTypes(t);

  const onChange = (newKey: TDateTypes): void => {
    const dateType = dateTypes.find(d => d.key === newKey);
    if (dateType) changeDateType(dateType);
  };

  const options = dateTypes.map(({ key: value, title }) => ({ label: `/${title}`, value }));

  return (
    <Select
      className={styles.NumberAddon}
      size='small'
      variant='borderless'
      onChange={onChange}
      value={dateType.key}
      options={options}
    />
  );
};

export default NumberAddon;