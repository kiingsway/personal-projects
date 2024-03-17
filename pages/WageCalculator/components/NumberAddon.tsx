import { IDateType, TDateTypes } from "@/interfaces";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { getDateTypes } from '@/pages-components/WageCalculatorParams';
import styles from '../WageCalculator.module.scss';

interface Props {
  dateType: IDateType;
  // eslint-disable-next-line no-unused-vars
  changeDateType: (newDateType: IDateType) => void;
}

const NumberAddon = ({ changeDateType, dateType }: Props): JSX.Element => {

  const { t } = useTranslation();

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