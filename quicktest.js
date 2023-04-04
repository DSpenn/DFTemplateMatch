const a = [];
const pixBounds = [];

a.push('0,7N', '0,6N', '0,5N', '0,4N', '0,3N', '0,2N', '0,1N',)
for (let block = 0; block < 40; block++) {
  for (let second = 0; second < 60; second++) {
    a.push({ block, second });
  }

}


for (let index = 0; index <= 2400; index++) {
  pixBounds.push(parseFloat((index * (102.4 / 60)).toFixed(1)));

}

//console.table(a);
/* console.log(a);
console.log(a.length); */
console.log(pixBounds);
//console.table(b);
console.log('pixBounds', pixBounds);

//console.log('b[439]',b[439], 'b[467]', b[467]);
//console.log('b[439]',b[439]/51.2, 'b[467]', b[467]/51.2);
console.log(pixBounds[pixBounds.length-1]);

const tileBounds = [];
for (let zz = 102.4; zz <= 4097; zz += 102.4) {
  tileBounds.push(zz);

}
//console.log(tileBounds);
//console.log(tileBounds.length);








/* 
const a = [];
const b = [];

a.push('0,7N','0,6N','0,5N','0,4N','0,3N','0,2N','0,1N',)
for (let block = 0; block < 40; block++) {
  for (let second = 0; second < 60; second++) {
    a.push({block,second});
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