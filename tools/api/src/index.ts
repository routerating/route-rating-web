export interface Request {
  authorization?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  contentType?: string;
  method: 'PUT' | 'POST' | 'GET';
  path: string;
  queryParams?: string;
  refresh?: string;
}

export function createJsonRequest(
  path: string,
  queryParams: string | undefined,
  method: 'PUT' | 'POST' | 'GET',
  authorization: string | undefined,
  refresh: string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
): Request {
  return {
    path,
    queryParams,
    method,
    authorization,
    refresh,
    body: JSON.stringify(body),
    contentType: 'application/json',
  };
}
