import { SizeType } from 'antd/es/config-provider/SizeContext';
import { InputNumberProps } from 'antd';
import { TNextTranslation } from '@/interfacesImport';

export const workHoursList = [4, 6, 8, 0];

export const getDateTypes = (t: TNextTranslation): IDateType[] => ([
  { key: "hour", title: t('Hour', { count: 1 }) },
  { key: "day", title: t('Day') },
  { key: "week", title: t('Week') },
  { key: "month", title: t('Month') },
  { key: "year", title: t('Year') }
]);

export const defaultDateType = (t: TNextTranslation): IDateType => getDateTypes(t)[3];

export const defaultCustomHour = 10;
export const defaultMonthDays = 20;
export const defaultIdealWage = 2400;

export const inputNumberProps = (type: 'int' | 'float' = 'int'): InputNumberProps => ({
  controls: false,
  changeOnWheel: true,
  size: 'small' as SizeType,
  formatter: (v): string => {
    if (type === 'int') return `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const valueNumber = parseFloat(String(v));
    if (!valueNumber && valueNumber !== 0) return '-';
    const int = `${Math.floor(valueNumber)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const dec = (valueNumber % 1).toFixed(2).slice(2);
    return `${int}${dec ? `.${dec}` : ``}`;
  },
  parser: v => parseFloat(v!.replace(/\$\s?|(,*)/g, '')),
});

export interface IDatesParameters { type: IDateType['key']; day: number; }
interface DatesParametersProps { workHours: number; monthDays: number; }

export const handleDatesParameters = ({ monthDays, workHours }: DatesParametersProps): IDatesParameters[] => [
  { type: 'hour', day: 1 / workHours },
  { type: 'day', day: 1 },
  { type: 'week', day: 7 },
  { type: 'month', day: monthDays },
  { type: 'year', day: monthDays * 12 },
];

interface IGetValueByDate {
  dateTypeKey: TDateTypes;
  value: number;
  workHours: number;
  monthDays: number;
}

export function getValueByDay({ dateTypeKey, value, workHours, monthDays }: IGetValueByDate): number {
  if (dateTypeKey === 'hour') return value * workHours;
  if (dateTypeKey === 'day') return value;
  if (dateTypeKey === 'week') return value / 7;
  if (dateTypeKey === 'month') return value / monthDays;
  if (dateTypeKey === 'year') return (value / 12) / monthDays;
  return -1;
}

export function handleValueDayToValueType({ dateTypeKey, value, workHours, monthDays }: IGetValueByDate): number {
  if (dateTypeKey === 'hour') return value / workHours;
  if (dateTypeKey === 'day') return value;
  if (dateTypeKey === 'week') return value * 7;
  if (dateTypeKey === 'month') return value * monthDays;
  if (dateTypeKey === 'year') return value * monthDays * 12;
  return -1;
}