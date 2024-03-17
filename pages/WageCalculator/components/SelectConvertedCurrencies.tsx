import { TCurrencies, IUseCurrencies } from "@/interfaces";
import { SelectProps, Select } from "antd";

interface Props {
  value: TCurrencies;
  currencyState: IUseCurrencies;
  // eslint-disable-next-line no-unused-vars
  onChange: (newCurrency: TCurrencies) => void;
}

const SelectConvertedCurrencies = ({ value, onChange, currencyState }: Props): JSX.Element => {

  const options: SelectProps['options'] = currencyState.currenciesItems
    .map(({ key, label, symbol }) => ({ label: `${label} (${symbol})`, value: key as string }));

  return (
    <Select
      size='small'
      variant='filled'
      onChange={onChange}
      value={value}
      style={{ width: 200 }}
      options={options}
    />
  );
};

export default SelectConvertedCurrencies;