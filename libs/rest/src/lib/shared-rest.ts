import { DEFAULT_HEADERS, DEFAULT_TIMEOUT } from './constants';
import type { FetchOptions, RestHeaders } from './types';

const createAborter = () => {
  const aborter = new AbortController();
  const { signal } = aborter;
  const abort = () => aborter.abort();
  return { signal, abort };
};

const createOptions = (headers: RestHeaders) => {
  const { signal, abort } = createAborter();

  const finalHeaders = {
    ...DEFAULT_HEADERS,
    ...headers,
  };

  const options = {
    headers: finalHeaders,
    signal,
  };
  return { abort, options };
};

const request = (fetchOptions: FetchOptions) => {
  const {
    headers,
    url,
    body,
    method = 'GET',
    throwOnError = false,
  }: FetchOptions = fetchOptions;

  const { abort, options } = createOptions(headers || {});
  const req = fetch(url, {
    ...options,
    method,
    body: JSON.stringify(body),
  }).then((res) => {
    if (!throwOnError || res.ok) {
      return res;
    }
    throw new Error(res.statusText);
  });
  return { req, abort };
};

const timeoutRequest = (
  fetchOptions: FetchOptions,
  timeout = DEFAULT_TIMEOUT
) => {
  const { req, abort } = request(fetchOptions);
  const timeoutRef = setTimeout(abort, timeout);
  void req.then(() => clearTimeout(timeoutRef));
  return { req, abort };
};

export { createAborter, timeoutRequest, request };
