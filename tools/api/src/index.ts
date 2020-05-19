interface Request {
  path: string;
  queryParams: string;
  authorization: string;
  accepts: string;
  contentType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}
