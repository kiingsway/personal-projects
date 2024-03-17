import React from "react";
import { BR, CA, US, EU } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
import { ICurrenciesItem, IUseCurrencies, TCurrencies } from "@/interfaces";

export default function useCurrencies(initialCurrencyKey: TCurrencies = 'CAD'): IUseCurrencies {

  const { t } = useTranslation();

  const currenciesItems: ICurrenciesItem[] = [
    {
      key: 'CAD',
      icon: <CA width={16} />,
      label: t('CanadianDollars'),
      symbol: 'C$',
      onClick: () => changeCurrency('CAD'),
    },
    {
      key: 'BRL',
      icon: <BR width={16} />,
      label: t("BrazilianReals"),
      symbol: 'R$',
      onClick: () => changeCurrency('BRL'),
    },
    {
      key: 'USD',
      icon: <US width={16} />,
      label: t('USDollars'),
      symbol: '$',
      onClick: () => changeCurrency('USD'),
    },
    {
      key: 'EUR',
      icon: <EU width={16} />,
      label: t('Euro'),
      symbol: '€',
      onClick: () => changeCurrency('EUR'),
    },
  ];

  const getCurrencyByKey = (key: string): ICurrenciesItem => currenciesItems.find(c => c.key === key) || currenciesItems[0];

  const initialCurrency = getCurrencyByKey(initialCurrencyKey);
  
  const [currency, selectCurrency] = React.useState<ICurrenciesItem>(initialCurrency);

  const changeCurrency = (newCurrencyKey: TCurrencies): void => selectCurrency(getCurrencyByKey(newCurrencyKey));

  return { currency, currenciesItems, changeCurrency } as const;
}