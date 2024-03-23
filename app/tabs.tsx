import { ITab } from "@/interfaces";
import { t } from "i18next";
import { FaCalculator } from "react-icons/fa6";
import { SiProbot } from "react-icons/si";

const appTabs: ITab[] = [
  {
    key: "WageCalculator",
    title: "Wage Calculator",
    desc: t('WageCalculatorDescription'),
    icon: <FaCalculator />
  },
  {
    key: "Chat",
    title: "Chat",
    desc: t('ChatTabDesc'),
    icon: <SiProbot />
  },
];

export default appTabs;