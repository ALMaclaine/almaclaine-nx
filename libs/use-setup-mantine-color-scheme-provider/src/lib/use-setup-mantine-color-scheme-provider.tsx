import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import type { ColorScheme } from '@mantine/core';
import { setCookie } from 'cookies-next';

type UseSetupColorSchemeProviderProps = {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
};

const MANTINE_COLOR_SCHEME_PROVIDER_KEY = 'mantine-color-scheme';

function useSetupMantineColorSchemeProvider(
  serverColorScheme?: ColorScheme
): UseSetupColorSchemeProviderProps {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: MANTINE_COLOR_SCHEME_PROVIDER_KEY,
    defaultValue: serverColorScheme || 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const finalValue = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(finalValue);
    setCookie('mantine-color-scheme', finalValue);
  };

  useHotkeys([['mod+J', () => toggleColorScheme]]);
  return { colorScheme, toggleColorScheme };
}

export type { UseSetupColorSchemeProviderProps };
export { useSetupMantineColorSchemeProvider };
