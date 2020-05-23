const { convertToUtc, dateDiff } = require('../helpers');

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
