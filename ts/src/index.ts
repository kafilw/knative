import axios from 'axios';

var urlparams = {
  host: 'http://node.default.127.0.0.1.sslip.io/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

export const handle = async (context) => {
  const startTime = Date.now();
  let body = context.body;
  let data = body.data;
  let counter = body.counter;

  if (counter < 100) {
    if (data == 'ping') {
      console.log("Received ping");
      console.log("Counter= " + counter);
      body.data = 'pong';
      //return { message: 'sent pong to node'}  

    } else if (data == 'pong') {
      console.log("Received pong");
      console.log("Counter= " + counter);
      body.data = 'ping';
      //return { message: 'sent ping to node'}
    } else {
      console.log("Received unknown message");
      //return { statusCode: 405, statusMessage: 'Method not allowed' };
    } 
  }
  else {
    console.log("Counter exceeded 100");
    //return { message: 'Counter exceeded 100'}
  }


  body.counter += 1;
  axios.post(urlparams.host, body, urlparams)
  const endTime = Date.now();
  console.log(`Execution time: ${endTime - startTime}ms`);
  return (endTime - startTime);
  //console.log(body);
  //return(body);

}
