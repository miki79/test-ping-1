const request = require('request');
const tcpPing = require('tcp-ping');
const fs = require('fs');

const getConfig = () => {
  return JSON.parse(fs.readFileSync(`${__dirname}/config.json`));
};

const checkSinglePing = (host, provider, location, type) => {
  return new Promise((resolve, reject) => {
    const options = {
      address: host,
      port: 443,
      attempts: 10,
    };

    tcpPing.ping(options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const results = {
          timestamp: new Date().getTime(),
          provider,
          location,
          type,
          address: host,
          avg: data.avg,
          max: data.max,
          min: data.min,
        };
        resolve(results);
      }
    });
  });
};

const checkPing = data => {
  const awsRegions = data.aws.regions;
  const awsServices = data.aws.services;
  const promises = [];

  awsServices.forEach(service => {
    awsRegions.forEach(region => {
      const hostname = service.hostname.replace('#REPLACE#', region);
      promises.push(checkSinglePing(hostname, 'aws', region, service.name));
    });
  });
  return Promise.all(promises);
};

const getResults = async () => {
  const data = getConfig();
  return {
    ping: checkPing(data.ping),
    //speed: await checkSpeed(data.speed),
  };
};

module.exports = {
  getResults,
};
