/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export async function sendRequest(request: Request): Promise<Response> {
  let url = `${request.url}/${request.path}`

  if (request.queryParams) url += `?${request.queryParams}`

  const headers = {
    Authorization: request.authorization || '',
    'Content-type': request.contentType || '',
    Refresh: request.refresh || '',
  }

  const body = request.body

  const method = request.method

  return fetch(url, {
    headers,
    body,
    method,
  })
}

export interface Request {
  authorization?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
  contentType?: string
  method: 'PUT' | 'POST' | 'GET'
  path: string
  queryParams?: string
  refresh?: string
  url: string
}

export function createJsonRequest(
  url: string,
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
    url,
  }
}
