import { IUseAppStorage } from "./app/hooks/useAppStorage";

/* eslint-disable no-unused-vars */
export type TCurrencies = 'CAD' | 'BRL' | 'USD' | 'EUR';
export type TTabs = 'interviewQuestions' | 'wageCalculator';
export type TDateTypes = 'hour' | 'day' | 'week' | 'month' | 'year';
export type TChangeCurrency = (newCurrency: TCurrencies) => void;
export type TChangeCustomHour = (newHour?: string | number | null) => void;

export interface ICurrenciesItem {
  key: TCurrencies;
  icon: React.JSX.Element;
  symbol: string;
  label: string;
  onClick: () => void;
}

export interface IUseCurrencies {
  currency: ICurrenciesItem;
  currenciesItems: ICurrenciesItem[];
  changeCurrency: (newCurrency: TCurrencies) => void;
}

export interface IAppContext {
  appStorage: IUseAppStorage;
  currencyState: IUseCurrencies;
  currencyExchange: ICurrencyExchange;
}

export interface ITab {
  key: string;
  title: string;
  icon: React.JSX.Element;
  desc?: string;
}

export interface IDateType {
  key: TDateTypes;
  title: string;
}

export interface IWageContext {
  customHour: number;
  changeCustomHour: TChangeCustomHour;
  dateType: IDateType;
  dateTypes: IDateType[];
  idealWage: number;
  monthDays: number;
  changeDateType: (newDateType: IDateType) => void
}

export interface ICurrencyExchange {
  CAD: number;
  EUR: number;
  BRL: number;
}