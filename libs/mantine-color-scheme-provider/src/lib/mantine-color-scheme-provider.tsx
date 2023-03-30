import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider as ColorSchemeProviderLib } from '@mantine/core';
import type { PropsWithChildren } from 'react';
import { useSetupMantineColorSchemeProvider } from '@almaclaine/use-setup-mantine-color-scheme-provider';

type MantineColorSchemeProviderProps = {
  colorScheme: ColorScheme;
};

function MantineColorSchemeProvider({
  colorScheme: startingColorScheme,
  children,
}: PropsWithChildren<MantineColorSchemeProviderProps>) {
  const { colorScheme, toggleColorScheme } =
    useSetupMantineColorSchemeProvider(startingColorScheme);

  return (
    <ColorSchemeProviderLib
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </ColorSchemeProviderLib>
  );
}

export type { MantineColorSchemeProviderProps };
export { MantineColorSchemeProvider };
