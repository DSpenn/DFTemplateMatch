const fs = require('fs');
const fslog = fs.createWriteStream('test.json');

const a = [];
const pixBounds = [];
let mapScale = (4096 / 40) / 60; //102.4
console.log(mapScale); //1.7066666666666668


a.push("20'7W", "20'6W", "20'5W", "20'4W", "20'3W", "20'2W", "20'1W", "20'0W");
for (let fN = 0; fN <= 40; fN++) {
  if (fN == 0) {
  } else if (fN <= 20) {
    for (let sN = 59; sN >= 0; sN--) {
      let newFN = 20 - fN;
      let t = newFN.toString() + "'" + sN.toString() + ' W';
      //a.push({ t })
      a.push(t);
    }
  }
  else if (fN > 20 && fN < 40) {
    for (let sN = 0; sN < 60; sN++) {
      let newFN = fN - 21;
      let t = newFN.toString() + "'" + sN.toString() + ' E';
      //a.push({ t })
      a.push(t);
    }
  }
  if (fN == 40) {
    for (let sN = 0; sN < 53; sN++) {
      let newFN = fN - 21;
      let t = newFN.toString() + "'" + sN.toString() + ' E';
      //a.push({ t })
      a.push(t);
    }
  }
}
console.log(a[1207]);
console.log(a[1208]);
a.splice(1208,1);
console.log(a[1208]);
const pixRanges = [];
for (let index = 1; index <= a.length; index++) {
  let temp = (parseFloat((index * mapScale).toFixed(1)));
  pixRanges.push(temp);
}

//logWrite(pixRanges);
//console.log(pixRanges);
//console.log(a.length); //2401



logWrite(a);


async function logWrite(results) {
  try {
    fslog.write(JSON.stringify(results, null, 4));
  } catch {
    console.log(error);
  }
}
