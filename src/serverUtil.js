import bodyParser from 'body-parser';

export const setCrossDomainHeader = (req, rsp, next) => {
  rsp.set({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': `${req.headers.origin}`,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'accept, content-type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  });
  next();
};
