const axios = require('axios');
const core = require('@actions/core');

/**
 * Sends build metrics to datadog.
 *
 * @param {Object[]} data - An Array of objects containing the information to send to datadog.
 * @param {string} datadogLocation - EU or COM depending on your Datadog location
 * @param {string} datadogToken - The API key for datadog
 */
const sendToDatadog = async (data, datadogLocation, datadogToken) => {
  try {
    await axios.post(
      `https://http-intake.logs.datadoghq.${datadogLocation}/v1/input/?service=github-actions`,
      data,
      {
        headers: {
          'DD-API-KEY': datadogToken,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err) {
    core.setFailed(`Action failed with error ${err}`);
  }
};

module.exports = { sendToDatadog };
