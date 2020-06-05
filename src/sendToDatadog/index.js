const request = require('request');
const core = require('@actions/core');

/**
 * Sends build metrics to datadog.
 *
 * @param {Object[]} data - An Array of objects containing the information to send to datadog.
 * @param {string} datadogLocation - EU or COM depending on your Datadog location
 * @param {string} datadogToken - The API key for datadog
 */
const sendToDatadog = (data, datadogLocation, datadogToken) => {
  const options = {
    method: 'POST',
    url: `https://http-intake.logs.datadoghq.${datadogLocation}/v1/input/?ddsource=postman&service=github-actions`,
    headers: {
      'DD-API-KEY': datadogToken,
      'Content-Type': ['application/json', 'text/plain'],
    },
    body: data,
  };
  request(options, function (error, response) {
    if (error) throw core.setFailed(`Action failed with error ${error}`);
    core.info(response.body);
  });
};

module.exports = { sendToDatadog };
