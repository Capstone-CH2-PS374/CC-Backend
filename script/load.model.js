const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");
const fs = require("fs").promises;
const path = require("path");

const loadModel = async () => {
  try {
    const modelPath = path.resolve(__dirname, "../models/model.json");
    const tokenizerPath = path.resolve(
      __dirname,
      "../models/test_tokenizerjson.json"
    );
    let model = await tf.loadLayersModel("file://" + modelPath);
    let tokenizer = JSON.parse(await fs.readFile(tokenizerPath, "utf8"));
    console.log("Model and tokenizer loaded successfully");
  } catch (error) {
    console.error("Error loading model:", error.message);
  }
};
