const { convertToUtc, dateDiff } = require('../helpers');

const parseSteps = unparsedSteps => {
  const { name, status, number, started_at, completed_at, conclusion } = unparsedSteps;
  const parsedSteps = {
    name,
    status,
    conclusion,
    number,
    started_at: convertToUtc(started_at),
    completed_at: convertToUtc(completed_at),
    total_time_ms: dateDiff(started_at, completed_at),
  };
  return parsedSteps;
};

module.exports = { parseSteps };
