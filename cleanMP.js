const Jimp = require('jimp');
const { cv, cvTranslateError } = require('opencv-wasm');

(async () => {
    try {
        const imageSource = (await Jimp.read(__dirname + '/c/3.png')).grayscale();
        //const imageTemplate = (await Jimp.read(__dirname + '/input/input1.png')).grayscale();
        const imageTemplate = (await Jimp.read(__dirname + '/resized.jpg')).grayscale();
        imageTemplate.resize(31, 31, Jimp.RESIZE_BEZIER);

        const imageOgS = (await Jimp.read(__dirname + '/c/3.png')); // to output in regular / not grayscale

        let srcOg = cv.matFromImageData(imageOgS.bitmap);
        let src = cv.matFromImageData(imageSource.bitmap);
        let templ = cv.matFromImageData(imageTemplate.bitmap);
        let processedImage = new cv.Mat();

        let mask = new cv.Mat();
        cv.matchTemplate(src, templ, processedImage, cv.TM_CCOEFF_NORMED, mask);
        //cv.matchTemplate(src, templ, processedImage, cv.TM_CCOEFF_NORMED);

        let result = cv.minMaxLoc(processedImage, mask);
        //  let result = cv.minMaxLoc(processedImage); mask isnt doing anything? because i already converted to grayscale?
        console.log('result', result);

        let maxPoint = result.maxLoc;

        let color = new cv.Scalar(0, 255, 0, 255);
        let point = new cv.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);
        console.log('maxPoint', maxPoint);
        console.log('point', point);

        cv.rectangle(srcOg, maxPoint, point, color, 2, cv.LINE_8, 0);

        new Jimp({
            width: srcOg.cols,
            height: srcOg.rows,
            data: Buffer.from(srcOg.data)
        })
            .write(__dirname + '/template-matching.jpg');

    } catch (err) {
        console.log(cvTranslateError(cv, err));
    }
})();