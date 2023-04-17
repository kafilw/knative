import axios from 'axios';

var urlparams = {
  host: 'http://node.default.127.0.0.1.sslip.io/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

export const handle = async (context) => {
  let body = context.body;
  let data = body.data;
  let counter = body.counter;

  while(counter < 100) {
    if (data == 'ping') {
      console.log("Received ping");
      console.log("Counter= " + counter);
      body.data = 'pong';
    } else if (data == 'pong') {
      console.log("Received pong");
      console.log("Counter= " + counter);
      body.data = 'ping';
    } else {
      console.log("Received unknown message");
      //return { statusCode: 405, statusMessage: 'Method not allowed' };
    }  

    counter += 1;
  }

  body.counter += 1;
  axios.post(urlparams.host, body, urlparams)
  //console.log(body);
  //return(body);

}
