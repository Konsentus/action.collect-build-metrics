/**
 * Fetched the workflow information from the github API.
 *
 * @param {import ('@octokit/action').Octokit} octokit The configured instance of Octokit
 * @param {Object} options
 * @param {string} options.owner The name of the repository owner.
 * @param {string} options.repo The name of the repository.
 * @param {string} options.runId The runId of the workflow.
 * @returns {Object[]} A complex object containing each job run - see https://developer.github.com/v3/actions/workflow-jobs/ for reference.
 */
const fetchWorkflow = async (octokit, { owner, repo, runId }) => {
  const {
    data: { jobs },
  } = await octokit.actions.listJobsForWorkflowRun({
    owner,
    repo,
    run_id: runId,
  });
  return jobs;
};

module.exports = { fetchWorkflow };
