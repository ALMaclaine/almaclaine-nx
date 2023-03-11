import { useMantineColorScheme } from '@mantine/core';
import type { UseSetupColorSchemeProviderProps } from '@almaclaine/use-setup-mantine-color-scheme-provider';

type UseColorSchemeProviderProps = UseSetupColorSchemeProviderProps & {
  dark: boolean;
};

function useMantineColorSchemeProvider(): UseColorSchemeProviderProps {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return { colorScheme, toggleColorScheme, dark };
}

export type { UseColorSchemeProviderProps };
export { useMantineColorSchemeProvider };
