import { InputNumber } from "antd";
import { inputNumberProps } from "../params";

interface Props {
  value: number
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string | number | null) => void;
  addonAfter: JSX.Element;
  addonBefore?: React.ReactNode
  placeholder: string;
}

const InputIdealWage = ({ addonAfter, addonBefore, onChange, placeholder, value }: Props): JSX.Element => (
  <InputNumber
    {...inputNumberProps('int')}
    value={value}
    variant='filled'
    onChange={onChange}
    style={{ width: 230 }}
    addonBefore={addonBefore}
    addonAfter={addonAfter}
    placeholder={placeholder}
  />
);

export default InputIdealWage;