const moment = require('moment');

/**
 * Gives the difference of 2 dates in ms
 *
 * @param {Date} startDate The start date
 * @param {Date} endDate The end date
 * @returns {string} Time difference in ms
 */
const dateDiff = (startDate, endDate) => {
  const start = moment(startDate, 'YYYY-M-DD HH:mm:ss.SSSZZ');
  const end = moment(endDate, 'YYYY-M-DD HH:mm:ss.SSSZZ');
  return end.diff(start, 'milliseconds');
};

/**
 * Removes any jobs that havent finished.
 *  Because this action runs at the end of a workflow, this job is never completed, we want to remove this job from the output as to keep our results clean.
 *
 * @param {Object[]} jobs The array of unparsed jobs.
 * @returns {Object[]} An array with only finished jobs.
 */
const filterFinishedJobs = jobs => jobs.filter(job => job.status === 'completed');

/**
 * converts a date to UTC format.
 *
 * @param {Date} date The start date
 * @returns {Date} A UTC datetime with format 'YYYY-M-DD HH:mm:ss.SSS'
 */
const convertToUtc = date => moment.utc(date);

module.exports = { dateDiff, filterFinishedJobs, convertToUtc };
