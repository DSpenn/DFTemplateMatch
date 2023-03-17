const Jimp = require('jimp');
const { cv, cvTranslateError } = require('opencv-wasm'); // replace with require('opencv-wasm') in prod

async function blah() {
}

(async () => {
    try {
        //const imageSource = (await Jimp.read(__dirname + '/bb.png')).grayscale();
        const imageSource = (await Jimp.read(__dirname + '/trim.png')).grayscale();
        const imageTemplate = (await Jimp.read(__dirname + '/input/i3Border.png')).grayscale();
        const mI = (await Jimp.read(__dirname + '/c/3.png')).grayscale();


        let src = cv.matFromImageData(imageSource.bitmap);
        let templ = cv.matFromImageData(imageTemplate.bitmap);
        let fSrc = cv.matFromImageData(mI.bitmap);

        let processedImage = new cv.Mat();
        let mask = new cv.Mat();

        cv.matchTemplate(src, templ, processedImage, cv.TM_CCOEFF_NORMED, mask);

        let result = cv.minMaxLoc(processedImage, mask);
        console.log('result', result);
        let maxPoint = result.maxLoc;

        let color = new cv.Scalar(0, 255, 0, 255);
        let point = new cv.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);
        console.log('maxPoint', maxPoint);
        console.log('point', point);
        cv.rectangle(src, maxPoint, point, color, 2, cv.LINE_8, 0);

        
        console.log(maxPoint.x, maxPoint.y, point.x, point.y);

        imageSource.crop(maxPoint.x, maxPoint.y, (point.x- maxPoint.x), (point.y- maxPoint.y), function (err) {
            if (err) throw err;
        })
            .write(__dirname + '/resized.jpg');


        //imageSource.write(__dirname + '/resized.jpg');





        new Jimp({
            width: src.cols,
            height: src.rows,
            data: Buffer.from(src.data)
        })
            .write(__dirname + '/template-matching.jpg');

    } catch (err) {
        console.log(cvTranslateError(cv, err));
    }
})();
