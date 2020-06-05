const { convertToUtc, dateDiff } = require('../helpers');

/**
 * @typedef {Object} ParsedStep
 * @property {string} name
 * @property {string} status
 * @property {string} conclusion
 * @property {number} number
 * @property {string} started_at
 * @property {string} completed_at
 * @property {number} total_time_ms
 */

/**
 * Parses a raw job step, to pull out only the information we need.
 *
 * @param {Object} unparsedStep A complex step object - see https://developer.github.com/v3/actions/workflow-jobs/ for reference.
 * @returns {ParsedStep} A parsedStep object
 */
const parseStep = unparsedStep => {
  const { name, status, number, started_at, completed_at, conclusion } = unparsedStep;

  const parsedStep = {
    name,
    status,
    conclusion,
    number,
    started_at: convertToUtc(started_at),
    completed_at: convertToUtc(completed_at),
    total_time_ms: dateDiff(started_at, completed_at),
  };

  return parsedStep;
};

module.exports = { parseStep };
