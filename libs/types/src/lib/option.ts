type Option<T> =
  | {
      valid: true;
      value: T;
    }
  | {
      valid: false;
      value?: undefined;
    };
export type { Option };
