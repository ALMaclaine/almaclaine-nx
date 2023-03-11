import type { ColorScheme, MantineThemeOverride } from '@mantine/core';
import { MantineProvider as MantineProviderLib } from '@mantine/core';
import type { PropsWithChildren } from 'react';
import { useSetupMantineColorSchemeProvider } from '@almaclaine/use-setup-mantine-color-scheme-provider';

type MantineProviderProps = {
  colorScheme: ColorScheme;
  theme: MantineThemeOverride;
};

function MantineProvider({
  theme,
  colorScheme: startingColorScheme,
  children,
}: PropsWithChildren<MantineProviderProps>) {
  const { colorScheme } =
    useSetupMantineColorSchemeProvider(startingColorScheme);

  return (
    <MantineProviderLib
      theme={{ ...theme, colorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
      {children}
    </MantineProviderLib>
  );
}

export type { MantineProviderProps };
export { MantineProvider };
