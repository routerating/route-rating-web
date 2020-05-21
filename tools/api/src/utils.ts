import { Request } from '.';

export async function sendRequest(request: Request): Promise<Response> {
  let url = `${process.env.API_URL}/${request.path}`;

  if (request.queryParams) url += `?${request.queryParams}`;

  const headers = {
    Authorization: request.authorization || '',
    'Content-type': request.contentType || '',
    Refresh: request.refresh || '',
  };

  const body = request.body;

  const method = request.method;

  return fetch(url, {
    headers,
    body,
    method,
  });
}
