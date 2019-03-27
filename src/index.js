const request = require('request');
const { getResults } = require('./lib.js');

getResults().then(data => {
  console.info(data);
  var options = { method: 'POST', url: 'https://enbuijgo87h2r.x.pipedream.net/', body: data, json: true };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body);
  });
});
