const fs = require('fs');
const fslog = fs.createWriteStream('test.json');

const nSouth = [];
const pixBounds = [];
let mapScale = (4096 / 40) / 60; //102.4
console.log(mapScale); //1.7066666666666668

nSouth.push("0'7 N", "0'6 N", "0'5 N", "0'4 N", "0'3 N", "0'2 N", "0'1 N", "0'0");

for (let nsi = 0; nsi < 40; nsi++) {
  if (nsi < 39) {
    for (let nssN = 0; nssN < 60; nssN++) {
      //let newFN = 20 - nsi;
      let t = nsi.toString() + "'" + nssN.toString() + ' S';
      //a.push({ t })
      nSouth.push(t);
    }
  }
  if (nsi == 39) {
    for (let nssN = 0; nssN < 53; nssN++) {
      let t = nsi.toString() + "'" + nssN.toString() + ' S';
      //a.push({ t })
      nSouth.push(t);
    }
  }
}

const pixRanges = [];
for (let index = 0; index < nSouth.length; index++) {
  let temp = (parseFloat((index * mapScale).toFixed(1)));
  pixRanges.push(temp);
}

logWrite(pixRanges);

console.log(nSouth.length); //2401


//logWrite(nSouth);


async function logWrite(results) {
  try {
    fslog.write(JSON.stringify(results, null, 4));
  } catch {
    console.log(error);
  }
}

