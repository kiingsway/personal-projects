/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useTranslation } from "react-i18next";
import { onlyUnique } from "../services/helpers";
import { IAppStorage, TCurrencies } from "@/interfaces";

export interface IUseAppStorage {
  appStorage: IAppStorage;
  handleTab: (tab: string, action: 'add' | 'remove') => void;
  changeLastTab: (last_tab: string) => void;
  changeCurrency: (currency: TCurrencies) => void;
}

function isValidAppStorage(parsedValue: any): boolean {

  const requiredProps: (keyof IAppStorage)[] = ['fav_tabs', 'language', 'currency'];

  for (const prop of requiredProps) if (!(prop in parsedValue)) return false;

  return true;
}

export default function useAppStorage(): IUseAppStorage {

  const { i18n } = useTranslation();
  
  const defaultAppStorage: IAppStorage = {
    fav_tabs: [],
    last_tab: undefined,
    language: i18n.language,
    currency: 'CAD'
  };

  const [appStorage, setAppStorage] = React.useState<IAppStorage>(defaultAppStorage);

  React.useEffect(() => {
    setAppStorage(prev => ({ ...defaultAppStorage, ...prev, language: i18n.language }));
  }, [i18n.language]);

  React.useLayoutEffect(() => {

    const storedValue = localStorage.getItem('personalprojects_storage');

    function setDefaultFavoriteTabs(): void {
      setAppStorage(defaultAppStorage);
      localStorage.setItem('personalprojects_storage', JSON.stringify(defaultAppStorage));
    }

    if (!storedValue) { setDefaultFavoriteTabs(); return; }

    try {
      const parsedValue = JSON.parse(storedValue);
      const isStringArray = isValidAppStorage(parsedValue);

      if (isStringArray) setAppStorage(parsedValue);
      else setDefaultFavoriteTabs();

    } catch (error) { setDefaultFavoriteTabs(); }

  }, []);

  function handleTab(tab: string, action: 'add' | 'remove'): void {
    setAppStorage(prev => {

      const prevTabs = prev?.fav_tabs || [];
      const prevState: IAppStorage = { ...defaultAppStorage, ...prev };
      const fav_tabs = (action === 'add' ? [...prevTabs, tab] : prevTabs.filter(p => p !== tab)).filter(onlyUnique);
      const newAppStorage = { ...prevState, fav_tabs };
      localStorage.setItem('personalprojects_storage', JSON.stringify(newAppStorage));
      return newAppStorage;
    });
  }

  const changeLastTab = (last_tab: string) => setAppStorage(prev => ({ ...defaultAppStorage, ...prev, last_tab }));
  const changeCurrency = (currency: TCurrencies) => setAppStorage(prev => ({ ...defaultAppStorage, ...prev, currency }));

  return { appStorage, handleTab, changeLastTab, changeCurrency };

}

