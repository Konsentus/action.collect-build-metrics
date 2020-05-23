const lodash = require('lodash');
const moment = require('moment');

const dateDiff = (startDate, endDate) => {
  const start = moment(startDate, 'YYYY-M-DD HH:mm:ss.SSSZZ');
  const end = moment(endDate, 'YYYY-M-DD HH:mm:ss.SSSZZ');
  return end.diff(start, 'milliseconds');
};

const filterFinishedJobs = jobs => lodash.filter(jobs, { status: 'completed' });

const convertToUtc = date => moment.utc(date).format('YYYY-M-DD HH:mm:ss.SSS');

module.exports = { dateDiff, filterFinishedJobs, convertToUtc };
