const { convertToUtc, dateDiff } = require('../helpers');
const { parseSteps } = require('../parseSteps');

const parseJob = unparsedJob => {
  const { name, started_at, completed_at, steps, html_url, run_id } = unparsedJob;

  const parsedJob = {
    started_at: convertToUtc(started_at),
    completed_at: convertToUtc(completed_at),
    total_time_ms: dateDiff(started_at, completed_at),
    job_name: name,
    url: html_url,
    run_id,
    steps: parseSteps(steps), //
  };

  return parsedJob;
};

module.exports = { parseJob };
