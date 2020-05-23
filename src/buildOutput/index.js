const { filterFinishedJobs } = require('../helpers/');
const { parseJob } = require('../parseJob');

const buildOutput = (jobs, repoMetaData) => {
  const { repo, owner, actor, runId, branch, sha, eventType } = repoMetaData;
  const finishedJobs = filterFinishedJobs(jobs);
  const output = {
    repo,
    owner,
    actor,
    run_id: runId,
    branch,
    sha,
    event_type: eventType,
    jobs: finishedJobs.map(job => parseJob(job)),
  };
  return output;
};

module.exports = { buildOutput };
