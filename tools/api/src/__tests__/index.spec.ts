import { createJsonRequest } from '..';

describe('createJsonRequest', () => {
  it('should create a Request object with correct fields.', async () => {
    const authorization = 'authorization';
    const refresh = 'refresh';
    const body = { key: 'value' };
    const path = '/some/endpoint';

    const returned = createJsonRequest(
      path,
      undefined,
      'POST',
      authorization,
      refresh,
      body
    );

    expect(returned.path).toEqual(path);
  });
});
