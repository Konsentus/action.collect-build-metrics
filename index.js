const { Octokit } = require('@octokit/action');
const core = require('@actions/core');
const fs = require('fs');
const { buildOutput } = require('./src');

const run = async () => {
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
  const actor = process.env.GITHUB_ACTOR;
  const runId = process.env.GITHUB_RUN_ID;
  const branch = process.env.GITHUB_REF.split('/')[2];
  const sha = process.env.GITHUB_SHA;
  const eventType = process.env.GITHUB_EVENT_NAME;

  const octokit = new Octokit();

  // See https://developer.github.com/v3/actions/workflow-jobs/
  const { data } = await octokit.request('GET /repos/:owner/:repo/actions/runs/:run_id/jobs', {
    owner,
    repo,
    run_id: runId,
  });

  metrics = buildOutput(data.jobs, { owner, repo, actor, runId, branch, sha, eventType });

  fs.writeFileSync('build-metrics.json', JSON.stringify(metrics));
};

run();
