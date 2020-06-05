# action.collect-build-metrics
This action uses the Github API to collect metrics using the endpoint https://developer.github.com/v3/actions/workflow-jobs/ for all proceeding jobs, and allows you to save the output to the filesystem for easy upload to artifacts, or the results can be pushed to a Datadog log endpoint for aggregation.

If you want to send the data to Datadog you will need to include a DATADOG_TOKEN secret in your repository. A token can be generated from https://app.datadoghq.com/account/settings#api or https://app.datadoghq.eu/account/settings#api depending where your Datadog instance is located.

## Usage

### Output metrics to filesystem and then upload to artifacts.

### Send metrics to Datadog
```yaml
env:
  DATADOG_TOKEN: ${{ secrets.DATADOG_TOKEN }}

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
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Collect metrics
        uses: konsentus/action.collect-build-metrics@v1.0
        with:
          send_to_dd: 'true'
          datadog_location: 'com'
```
