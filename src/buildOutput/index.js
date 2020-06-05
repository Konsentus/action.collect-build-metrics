const { filterFinishedJobs } = require('../helpers');
const { parseJob } = require('../parseJob');
const { parseStep } = require('../parseStep');

/**
 * @typedef {Object} RepoMetaData
 * @property {string} repo
 * @property {string} owner
 * @property {string} actor
 * @property {string} runId
 * @property {string} branch
 * @property {string} sha
 * @property {string} eventType
 * @property {string} workflowName
 */

/**
 * builds the metrics into a useable output
 *
 * @param {import('../parseJob/index').UnparsedJob[]} jobs An array of unparsed jobs.
 * @param {RepoMetaData} options Meta data
 * @returns {BuildOutput[]} An array
 */
const buildOutput = (jobs, { repo, owner, actor, runId, branch, sha, eventType, workflowName }) => {
  const finishedJobs = filterFinishedJobs(jobs);

  const result = [];

  finishedJobs.forEach(job => {
    job['steps'].forEach(step => {
      let output = {
        repo,
        owner,
        actor,
        run_id: runId,
        branch,
        sha,
        event_type: eventType,
        job: parseJob(job),
        step: parseStep(step),
        workflow_name: workflowName,
      };
      result.push(output);
    });
  });

  return result;
};

module.exports = { buildOutput };
