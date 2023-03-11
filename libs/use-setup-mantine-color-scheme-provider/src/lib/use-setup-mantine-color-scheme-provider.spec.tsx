import { act, renderHook } from '@testing-library/react';
import * as React from 'react';
import { useSetupMantineColorSchemeProvider } from './use-setup-mantine-color-scheme-provider';

describe('useSetupColorSchemeProvider', () => {
  it('should toggle color schemes correctly', () => {
    const { result } = renderHook(() => useSetupMantineColorSchemeProvider());

    expect(result.current.colorScheme).toBe('light');

    act(() => {
      result.current.toggleColorScheme();
    });

    expect(result.current.colorScheme).toBe('dark');

    act(() => {
      result.current.toggleColorScheme();
    });

    expect(result.current.colorScheme).toBe('light');
  });
});
