// import { Context, StructuredReturn } from 'faas-js-runtime';

// /**
//  * Your HTTP handling function, invoked with each request. This is an example
//  * function that logs the incoming request and echoes its input to the caller.
//  *
//  * It can be invoked with `func invoke`
//  * It can be tested with `npm test`
//  *
//  * It can be invoked with `func invoke`
//  * It can be tested with `npm test`
//  *
//  * @param {Context} context a context object.
//  * @param {object} context.body the request body if any
//  * @param {object} context.query the query string deserialized as an object, if any
//  * @param {object} context.log logging object with methods for 'info', 'warn', 'error', etc.
//  * @param {object} context.headers the HTTP request headers
//  * @param {string} context.method the HTTP request method
//  * @param {string} context.httpVersion the HTTP protocol version
//  * See: https://github.com/knative/func/blob/main/docs/guides/nodejs.md#the-context-object
//  */
// export const haandle = async (context: Context, body: string): Promise<StructuredReturn> => {
//   // YOUR CODE HERE
//   context.log.info(`
// -----------------------------------------------------------
// Headers:
// ${JSON.stringify(context.headers)}

// Query:
// ${JSON.stringify(context.query)}

// Body:
// ${JSON.stringify(body)}
// -----------------------------------------------------------
// `);
//   return {
//     body: body,
//     headers: {
//       'content-type': 'application/json'
//     }
//   };
// };
// ///////////////////////////////////////////


import axios from 'axios';


var urlparams = {
  host: 'http://node.default.127.0.0.1.sslip.io/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};


export const handle = async (context) => {
  const body = context.body;
  let data = body.data;
  let ping = "ping";
  let pong = "pong";

  if (data == 'ping') {
    axios.post(urlparams.host, {data: pong}, urlparams)
    return(pong);
  } else if (data == 'pong') {
    axios.post(urlparams.host, {data: ping}, urlparams)
    return(ping);
  } else {
    return { statusCode: 405, statusMessage: 'Method not allowed' };
  }
}
