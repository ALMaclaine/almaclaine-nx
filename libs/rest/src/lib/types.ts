type HTTPMethods =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT';

type RestHeaders = Record<string, string>;
type RestBody = Record<string, unknown>;
type Aborter = () => void;

type FetchOptions = {
  url: string;
  body?: RestBody;
  headers?: RestHeaders;
  method: HTTPMethods;
  mode?: 'cors' | 'no-cors' | 'same-origin';
  throwOnError?: boolean;
};

export type { HTTPMethods, RestHeaders, RestBody, Aborter, FetchOptions };
