const { convertToUtc, dateDiff } = require('../helpers');

/**
 * @typedef {Object} ParsedJob
 * @property {string} job_name
 * @property {string} run_id
 * @property {string} conclusion
 * @property {string} started_at
 * @property {string} completed_at
 * @property {number} total_time_ms
 */

/**
 * Parsed an unparsed job object to pull out only the information we need.
 *
 * @param {Object} unparsedJob A complex object containing job information - see https://developer.github.com/v3/actions/workflow-jobs/ for reference.
 * @returns {ParsedJob} A parsedjob object
 */
const parseJob = unparsedJob => {
  const { name, started_at, completed_at, run_id, conclusion } = unparsedJob;

  const parsedJob = {
    job_name: name,
    run_id: run_id,
    conclusion,
    started_at: convertToUtc(started_at),
    completed_at: convertToUtc(completed_at),
    total_time_ms: dateDiff(started_at, completed_at),
  };

  return parsedJob;
};

module.exports = { parseJob };
