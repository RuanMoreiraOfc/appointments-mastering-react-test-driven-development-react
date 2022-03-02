export { getFetchResponseOk, getFetchResponseError, getRequestBodyOf };

const getFetchResponseOk = (body) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  });

const getFetchResponseError = () => Promise.resolve({ ok: false });

const getRequestBodyOf = (fetchSpy) =>
  JSON.parse(fetchSpy.mock.calls[0][1].body);
