import { ITab } from "@/interfaces";
import { t } from "i18next";
import { FaCalculator } from "react-icons/fa6";

const appTabs: ITab[] = [
  {
    key: "WageCalculator",
    title: "Wage Calculator",
    desc: t('WageCalculatorDescription'),
    icon: <FaCalculator />
  },
];

export default appTabs;