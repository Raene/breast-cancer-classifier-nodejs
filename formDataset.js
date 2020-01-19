const fs = require("fs");
const path = require("path");

let filePath = path.join(__dirname, "wdbc.data");

//read the dataset into an array
async function cleanDataset(encoding) {
  try {
    let data = await fs.promises.readFile(filePath, { encoding });
    let array = data.toString().split("\n");
    return array;
  } catch (err) {
    if (err) throw err;
  }
}

//formdataset
async function formDataset() {
  try {
    let data = await cleanDataset("utf8");
    let testArray = [];
    let trainArray = [];

    //create an array of objects from the dataset
    newData = data
      .map(el => {
        let nIndex = el.search(/B|M/);
        let imageData = el.slice(nIndex + 2).split(",");
        let metaData = el.slice(0, nIndex + 1).split(",");
        return {
          id: metaData[0],
          class: metaData[1],
          imageData
        };
      }) // filter any empty array
      .filter(el => el.imageData[0] !== "");

    //split data into testArray and trainArray
    for (let i = 0; i < Math.round(newData.length / 10); i++) {
      index = Math.floor(Math.random() * Math.round(100)) + 1;
      testArray.push(newData[index]);
      newData.splice(index, 1);
      trainArray = newData;
    }

    //write the arrays to their respective json files
    fs.writeFile("training.json", JSON.stringify(trainArray), function() {});
    fs.writeFile("testing.json", JSON.stringify(testArray), function() {});
  } catch (err) {}
}
formDataset();
