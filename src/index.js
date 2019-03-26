const request = require('request');
const { getResults } = require('./lib.js');

getResults().then(data => {
  var options = { method: 'POST', url: 'https://enudlh7uqfu5.x.pipedream.net/', body: data, json: true };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body);
  });
});
