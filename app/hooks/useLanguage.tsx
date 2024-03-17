import React from "react";
import { BR, CA, FR, ES } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
import { TFunction, changeLanguage } from "i18next";

type TLanguages = 'en' | 'br' | 'fr' | 'es';

export interface ILanguageItem {
  key: TLanguages;
  icon: React.JSX.Element;
  label: string;
  onClick: () => Promise<TFunction<"translation", undefined>>;
}

export interface IUseLanguage {
  selected: ILanguageItem;
  items: ILanguageItem[];
  // eslint-disable-next-line no-unused-vars
  change: (lang: TLanguages) => Promise<TFunction<"translation", undefined>>;
}

export function useLanguage(defaultLang: TLanguages = 'en'): IUseLanguage {

  if (defaultLang !== 'en') changeLanguage(defaultLang);

  const { i18n } = useTranslation();

  const languages: ILanguageItem[] = [
    {
      key: 'en',
      icon: <CA width={16} />,
      label: "English",
      onClick: () => changeLanguage('en'),
    },
    {
      key: 'br',
      icon: <BR width={16} />,
      label: "Português",
      onClick: () => changeLanguage('br'),
    },
    {
      key: 'fr',
      icon: <FR width={16} />,
      label: "Français",
      onClick: () => changeLanguage('fr'),
    },
    {
      key: 'es',
      icon: <ES width={16} />,
      label: "Español",
      onClick: () => changeLanguage('es'),
    },
  ];

  const selected = languages.find(l => l.key === i18n.language);
  
  if (!selected) throw new Error(`The language ${i18n.language} was not found on languages items.`);

  return { selected, items: languages, change: (lang: TLanguages) => changeLanguage(lang) } as const;
}