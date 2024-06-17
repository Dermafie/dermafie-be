const tf = require('@tensorflow/tfjs-node');
const axios = require('axios');

const MODEL_URL = process.env.MODEL_URL;
let model = null;

const loadModel = async () => {
    if (!model) {
        model = await tf.loadGraphModel(MODEL_URL);
    }
    return model;
};

const predictDisease = async (imageBuffer) => {
    const model = await loadModel();
    const image = tf.node.decodeImage(imageBuffer, 3);
    const resizedImage = tf.image.resizeBilinear(image, [224, 224]);  // Change to [224, 224]
    const normalizedImage = resizedImage.div(255.0);
    const batchedImage = normalizedImage.expandDims(0);

    const predictions = model.predict(batchedImage);
    const probs = predictions.dataSync();
    const predIndex = probs.indexOf(Math.max(...probs));
    const classes = ['Healthy Skin', 'Melanoma', 'Rosacea', 'Sel Basal'];

    const prediction = classes[predIndex];
    const probability = Math.max(...probs);

    return { prediction, probability };
};

module.exports = predictDisease;
