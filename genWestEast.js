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

const pixRanges = [];
for (let index = 0; index < a.length; index++) {
  let temp = (parseFloat((index * mapScale).toFixed(1)));
  pixRanges.push(temp);
}

//logWrite(pixRanges);
console.log(pixRanges);

console.log(a.length); //2401

//  2280   │ `19'52"E` 


/* console.log(a);
console.table(a);

console.log(a[1250]);

for (let index = 0; index < a.length; index++) {
  if (index > 1200 && index < 1300) {
    console.log(a[index]);
  }
  
} */

logWrite(a);


async function logWrite(results) {
  try {
    fslog.write(JSON.stringify(results, null, 4));
  } catch {
    console.log(error);
  }
}




/* for (let index = 0; index <= 2400; index++) {
  pixBounds.push(parseFloat((index * (102.4 / 60)).toFixed(1)));

}

//console.table(a);
//console.log(a);
//console.log(a.length);
console.log(pixBounds);
console.log('pixBounds', pixBounds, 'len', pixBounds.length);

console.log('pixBounds[1200]',pixBounds[1200], 'pixBounds[1207]', pixBounds[1208]);
console.log('pixBounds[0]',pixBounds[0], 'pixBounds[7]', pixBounds[8]);
//console.log('b[439]',b[439]/51.2, 'b[467]', b[467]/51.2);
console.log(pixBounds[pixBounds.length-1]);
console.log(pixBounds[2400]);
//console.table(pixBounds);
console.log('pixBounds[757]',pixBounds[757], 'pixBounds[758]', pixBounds[758]);
//console.log(tileBounds.length);
 */





/* const tileBounds = [];
for (let zz = 102.4; zz <= 4097; zz += 102.4) {
  tileBounds.push(parseFloat(zz.toFixed(1)));

}
console.log(tileBounds); */




/* 
const a = [];
const b = [];

a.push('0,7N','0,6N','0,5N','0,4N','0,3N','0,2N','0,1N',)
for (let fN = 0; fN < 40; fN++) {
  for (let sN = 0; sN < 60; sN++) {
    a.push({fN,sN});
  }
  
}


for (let index = 0; index <= 2048; index++) {
  b.push(index/(51.2/60));
      
}

//console.table(a);
console.log(a);
console.log(a.length);
//console.log(b);
//console.table(b);
console.log(b.length);

console.log('b[439]',b[439], 'b[467]', b[467]);
console.log('b[439]',b[439]/51.2, 'b[467]', b[467]/51.2);

const c = [];
for (let zz = 51.2; zz <= 2049; zz+=51.2) {
c.push(zz);
  
}
console.log(c);
console.log(c.length); */