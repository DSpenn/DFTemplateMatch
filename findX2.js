const Jimp = require("jimp");
const { cv, cvTranslateError } = require("opencv-wasm"); // replace with require('opencv-wasm') in prod

(async () => {
  try {
    const imageSource = (await Jimp.read(__dirname + "/trim.png")).grayscale();
    //const imageTemplate = (await Jimp.read(__dirname + '/x2.png')).grayscale();
    const imageTemplate = (await Jimp.read(__dirname + "/x.png")).grayscale();

    let src = cv.matFromImageData(imageSource.bitmap);
    let templ = cv.matFromImageData(imageTemplate.bitmap);

    let processedImage = new cv.Mat();
    let mask = new cv.Mat();

    cv.matchTemplate(src, templ, processedImage, cv.TM_CCOEFF_NORMED, mask);

    let result = cv.minMaxLoc(processedImage, mask);
    console.log("result", result);
    let maxPoint = result.maxLoc;

    let color = new cv.Scalar(0, 255, 0, 255);
    let point = new cv.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);
    cv.rectangle(src, maxPoint, point, color, 2, cv.LINE_8, 0);

    console.log(maxPoint.x, maxPoint.y, point.x, point.y);

    imageSource
      .crop(maxPoint.x - 100, maxPoint.y - 100, 250, 250, function (err) {
        if (err) throw err;
      })
      .write(__dirname + "/resized.jpg");

    //imageSource.write(__dirname + '/resized.jpg');

    new Jimp({
      width: src.cols,
      height: src.rows,
      data: Buffer.from(src.data),
    }).write(__dirname + "/template-matching.jpg");
  } catch (err) {
    console.log(cvTranslateError(cv, err));
  }
})();




/* 
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context. 
Use the 3- or 5-argument syntax to omit this argument.  */