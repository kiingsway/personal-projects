import React from 'react';
import { onlyUnique } from '../services/helpers';

interface IUseFavTabs {
  favoriteTabs: string[];
  // eslint-disable-next-line no-unused-vars
  handleTab: (tab: string, action: 'add' | 'remove') => void;
}

export default function useFavoriteTabs(): IUseFavTabs {
  const [favoriteTabs, setFavoriteTabs] = React.useState<string[]>([]);

  React.useEffect(() => {

    const storedValue = localStorage.getItem('personalprojects_storage');

    function setDefaultFavoriteTabs(): void {
      setFavoriteTabs([]);
      localStorage.setItem('personalprojects_storage', '[]');
    }

    if (!storedValue) { setDefaultFavoriteTabs(); return; }

    try {
      const parsedValue = JSON.parse(storedValue);
      const isStringArray = Array.isArray(parsedValue) && parsedValue.every((item) => typeof item === 'string');

      if (isStringArray) setFavoriteTabs(parsedValue);
      else setDefaultFavoriteTabs();

    } catch (error) { setDefaultFavoriteTabs(); }
  }, []);

  function handleTab(tab: string, action: 'add' | 'remove') {
    setFavoriteTabs(prevTabs => {
      const newTabs = (action === 'add' ? [...prevTabs, tab] : prevTabs.filter(p => p !== tab)).filter(onlyUnique);
      localStorage.setItem('personalprojects_storage', JSON.stringify(newTabs));
      return newTabs;
    });
  }

  return { favoriteTabs, handleTab };
}