const GaussianNB = require("ml-naivebayes").GaussianNB;
const normed = require("ml-array-normed");
const breastCancer = require("./training.json");
const breastCancerTestData = require("./testing.json");

//create training and testing data
//normalize the data as it's being mapped into the new array
const trainingData = breastCancer.map(item => normed(item.imageData));
const testingData = breastCancerTestData.map(item => normed(item.imageData));

//create training and testing labels
const trainingLabel = breastCancer.map(item =>
  item.class === "M" ? 1 : item.class === "B" ? 0 : null
);
const testingLabel = breastCancerTestData.map(item =>
  item.class === "M" ? 1 : item.class === "B" ? 0 : null
);

//create model
var model = new GaussianNB();
//train model
model.train(trainingData, trainingLabel);

//predict data
var predictions = model.predict(testingData);

//function to calculate the error % in model prediction
function error(predicted, expected) {
  let misclassifications = 0;
  for (var index = 0; index < predicted.length; index++) {
    console.log(
      `truth : ${expected[index]} and prediction : ${predicted[index]}`
    );
    if (predicted[index] !== expected[index]) {
      misclassifications++;
    }
  }
  return (misclassifications / predicted.length) * 100;
}
console.log(error(predictions, testingLabel));
