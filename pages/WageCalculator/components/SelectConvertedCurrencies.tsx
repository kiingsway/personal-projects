import { TCurrencies, IAppContext } from "@/interfaces";
import { AppContext } from "@/pages/_app";
import { SelectProps, Select } from "antd";
import { useContext } from "react";

interface Props {
  value: TCurrencies;
  // eslint-disable-next-line no-unused-vars
  onChange: (newCurrency: TCurrencies) => void
}

const SelectConvertedCurrencies = ({ value, onChange }: Props): JSX.Element => {

  const { currencyState } = useContext(AppContext) as IAppContext;

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