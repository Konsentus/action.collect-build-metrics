const { buildOutput } = require('./buildOutput');
const { sendToDatadog } = require('./sendToDatadog');
const { fetchWorkflow } = require('./fetchWorkflow');

module.exports = { buildOutput, sendToDatadog, fetchWorkflow };
