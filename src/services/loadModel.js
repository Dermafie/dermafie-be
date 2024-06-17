const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
  return await tf.loadGraphModel('https://storage.googleapis.com/dermafie-bucket/model-in-prod/model.json');
}

module.exports = loadModel;
