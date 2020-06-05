const { Octokit } = require('@octokit/action');
const fs = require('fs');
const core = require('@actions/core');
const { buildOutput, sendToDatadog, fetchWorkflow } = require('./src');

const run = async () => {
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
  const actor = process.env.GITHUB_ACTOR;
  const runId = process.env.GITHUB_RUN_ID;
  const branch = process.env.GITHUB_REF.split('/')[2];
  const sha = process.env.GITHUB_SHA;
  const eventType = process.env.GITHUB_EVENT_NAME;
  const workflowName = process.env.GITHUB_WORKFLOW;
  const sendMetricsToDatadog = core.getInput('send_to_dd');
  const datadogLocation = core.getInput('datadog_location');
  const saveMetricsFs = core.getInput('save_to_fs');
  const fileName = core.getInput('filename');
  const datadogApiKey = process.env.DATADOG_TOKEN;

  const octokit = new Octokit();

  const jobData = await fetchWorkflow(octokit, { owner, repo, runId });

  buildMetrics = buildOutput(jobData, {
    owner,
    repo,
    actor,
    runId,
    branch,
    sha,
    eventType,
    workflowName,
  });

  if (sendMetricsToDatadog === 'true') {
    sendToDatadog(JSON.stringify(buildMetrics), datadogLocation, datadogApiKey);
  }

  if (saveMetricsFs === 'true') {
    fs.writeFileSync(fileName, JSON.stringify(buildMetrics));
  }
};

run();
