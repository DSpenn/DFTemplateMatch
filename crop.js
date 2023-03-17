const fs = require('fs');
const Jimp = require('jimp');const { cv, cvTranslateError } = require('opencv-wasm');

async function main() {
  const imageSource = (await Jimp.read(__dirname + '/input/input1.png'));
  //.grayscale();
  //imageSource.resize(400, Jimp.AUTO);
  imageSource.resize(31, 31, Jimp.RESIZE_BEZIER);
  let src = cv.matFromImageData(imageSource.bitmap);
  //markers	=	cv.watershed(	src, markers	);
  //sconsole.log(markers);
  //image.write('./blah.jpg'); 

  new Jimp({
    width: src.cols,
    height: src.rows,
    data: Buffer.from(src.data)
})
    .write(__dirname + '/test-output/test.jpg');



}

main();