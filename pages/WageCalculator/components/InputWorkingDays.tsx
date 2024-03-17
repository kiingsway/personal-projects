import { IWageContext } from "@/interfaces";
import { InputNumber } from "antd";
import { WageContext } from "..";
import { inputNumberProps } from "../params";
import { useContext } from "react";

interface Props {
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string | number | null) => void;
  addonAfter: string;
}

const InputWorkingDays = (props: Props): JSX.Element => {

  const { monthDays } = useContext(WageContext) as IWageContext;

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