const { filterFinishedJobs } = require('../helpers');
const { parseJob } = require('../parseJob');
const { parseStep } = require('../parseStep');

/**
 * @typedef {Object} BuildOutput
 * @property {string} repo
 * @property {string} owner
 * @property {string} actor
 * @property {string} run_id
 * @property {string} branch
 * @property {string} sha
 * @property {string} eventType
 * @property {import('../parseJob/index').ParsedJob[]} job
 * @property {import('../parseStep/index').ParsedStep[]} step
 * @property {string} workflowName
 */

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
 * @param {Object[]} jobs An array of complex objects containing job information - see https://developer.github.com/v3/actions/workflow-jobs/ for reference.
 * @param {RepoMetaData} options Meta data
 * @returns {BuildOutput[]} An array of BuildOutput
 */
const buildOutput = (jobs, { repo, owner, actor, runId, branch, sha, eventType, workflowName }) => {
  const finishedJobs = filterFinishedJobs(jobs);

  const result = [];

  finishedJobs.forEach(job => {
    job['steps'].forEach(step => {
      result.push({
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
      });
    });
  });

  return result;
};

module.exports = { buildOutput };
