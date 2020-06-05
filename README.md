# action.collect-build-metrics

This action uses the Github API to collect metrics using the endpoint https://developer.github.com/v3/actions/workflow-jobs/ for all proceeding jobs, and allows you to save the output to the filesystem for easy upload to artifacts, or the results can be pushed to a Datadog log endpoint for aggregation, to interact with the Github API you will need to generate a github token, this should be set as the environemnt variable GITHUB_TOKEN.

If you want to send the data to Datadog you will need to include a DATADOG_TOKEN secret in your repository. A token can be generated from https://app.datadoghq.com/account/settings#api or https://app.datadoghq.eu/account/settings#api depending where your Datadog instance is located.

The action is able to always run no matter what the outcome of the proceeding jobs are by using

- `jobs.<job_id>.needs` with every action that is present in the workflow
- `jobs.<job_id>.if` set to always()

## Building the action

The action run by calling dist/index.js this file is created using ncc. To build this file please run `npm run build`

## Usage

### Output metrics to filesystem and then upload to artifacts.

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

obs:
  job1:
    name: First job
    runs-on: ubuntu-latest
    steps:
      # the rest of your action

  job2:
    name: Second job
    runs-on: ubuntu-latest
    steps:
      # the rest of your action

  build-metrics:
    runs-on: ubuntu-latest
    name: collect metrics
    needs: [job1, job2]
    if: always()
    steps:
      - name: Collect metrics
        uses: konsentus/action.collect-build-metrics@v1.0
        with:
          save_to_fs: 'true'
          filename: 'build-metrics.json'

      - name: Upload to artifacts
        uses: actions/upload-artifact@v2
        with:
          name: build-metrics
          path: build-metrics.json
```

### Send metrics to Datadog

```yaml
env:
  DATADOG_TOKEN: ${{ secrets.DATADOG_TOKEN }}
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

jobs:
  job1:
    name: First job
    runs-on: ubuntu-latest
    steps:
      # the rest of your action

  job2:
    name: Second job
    runs-on: ubuntu-latest
    steps:
      # the rest of your action

  build-metrics:
    runs-on: ubuntu-latest
    name: collect metrics
    needs: [job1, job2]
    if: always()
    steps:
      - name: Collect metrics
        uses: konsentus/action.collect-build-metrics@v1.0
        with:
          send_to_dd: 'true'
          datadog_url_location: 'com'
```

## Data returned

The data is returned as an array of JSON objects, each step is a separate element of the array, the reason for that is for easy ingestion into log monitoring tools. e.g. datadog

```json
[
  {
    "actor": "username",
    "branch": "branch-name",
    "event_type": "push",
    "job": {
      "completed_at": "2020-5-22 13:59:37.000",
      "conclusion": "success",
      "job_name": "job1",
      "run_id": 111111111,
      "started_at": "2020-5-22 13:59:23.000",
      "total_time_ms": 14000
    },
    "owner": "repo-owner",
    "repo": "my-repo",
    "run_id": "111111111",
    "sha": "da182bdbe259cc8a2eb43399153c6f81ad294cddc",
    "step": {
      "completed_at": "2020-5-22 13:59:25.000",
      "conclusion": "success",
      "name": "Set up job",
      "number": 1,
      "started_at": "2020-5-22 13:59:23.000",
      "status": "completed",
      "total_time_ms": 2000
    },
    "workflow_name": "my first workflow"
  }
]
```
