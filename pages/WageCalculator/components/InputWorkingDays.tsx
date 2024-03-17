import { InputNumber } from "antd";
import { inputNumberProps } from '@/pages-components/WageCalculatorParams';

interface Props {
  addonAfter: string;
  monthDays: number
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string | number | null) => void;
}

const InputWorkingDays = (p: Props): JSX.Element => {

  const { monthDays, ...props } = p;

  return (
    <InputNumber
      {...inputNumberProps('int')}
      {...props}
      variant='filled'
      value={monthDays}
      min={5}
      max={31}
      style={{ width: 220 }}
    />
  );
};

export default InputWorkingDays;