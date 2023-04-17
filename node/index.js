/**
 * Your HTTP handling function, invoked with each request. This is an example
 * function that echoes its input to the caller, and returns an error if
 * the incoming request is something other than an HTTP POST or GET.
 *
 * In can be invoked with 'func invoke'
 * It can be tested with 'npm test'
 *
 * @param {Context} context a context object.
 * @param {object} context.body the request body if any
 * @param {object} context.query the query string deserialized as an object, if any
 * @param {object} context.log logging object with methods for 'info', 'warn', 'error', etc.
 * @param {object} context.headers the HTTP request headers
 * @param {string} context.method the HTTP request method
 * @param {string} context.httpVersion the HTTP protocol version
 * http://ts.default.127.0.0.1.sslip.io/
 * See: https://github.com/knative/func/blob/main/docs/function-developers/nodejs.md#the-context-object
 */
const axios = require('axios');


var urlparams = {
  host: 'http://ts.default.127.0.0.1.sslip.io/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const handle = async (context) => {
  const startTime = Date.now();
  let body = context.body;
  data = body.data;
  counter = body.counter;

  while(counter < 100) {
    if (data == 'ping') {
      console.log("Received ping");
      console.log("Counter= " + counter);
      body.data = 'pong';    
    }
    else if (data == 'pong') {
      console.log("Received pong");
      console.log("Counter= " + counter);
      body.data = 'ping';
    }
    else {
      console.log("Received unknown message");
      return { statusCode: 405, statusMessage: 'Method not allowed' };
    }

    counter += 1;
  }

  body.counter += 1;
  //console.log("Body: " + body);
  axios.post(urlparams.host, body);
  //console.log(body)
  const endTime = Date.now();
  console.log(`Time taken: ${endTime - startTime}ms`);
  return body;
}

module.exports = { handle };

