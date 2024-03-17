import useBoolean from './useBoolean';

export default function useDarkMode(): boolean {

  const [isDarkMode, { setTrue: setDark, setFalse: setLight }] = useBoolean(true);

  const handleDarkMatches = (): boolean | undefined => {
    try {
      return window && window?.matchMedia('(prefers-color-scheme: dark)')?.matches;
    }
    catch (e) {
      return undefined;
    }
  };

  const darkMatches = handleDarkMatches();

  if (darkMatches && window?.matchMedia) {
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkMode !== isDarkMode) if (darkMode) setDark(); else setLight();
  }

  return isDarkMode;
}
