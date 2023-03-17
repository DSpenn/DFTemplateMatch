const Jimp = require('jimp');
const { cv, cvTranslateError } = require('opencv-wasm'); // replace with require('opencv-wasm') in prod

(async () => {
    try {
        const imageSource = (await Jimp.read(__dirname + '/c/3.png')).grayscale();
        const imageTemplate = (await Jimp.read(__dirname + '/input/input1.png')).grayscale();
        imageTemplate.resize(31, 31, Jimp.RESIZE_BEZIER);
        //imageTemplate.write(__dirname + '/resized.jpg');

        const iS = (await Jimp.read(__dirname + '/c/3.png'));
        const iFour = (await Jimp.read(__dirname + '/c/4.png'));

        let iSS = cv.matFromImageData(iS.bitmap);
        let src = cv.matFromImageData(imageSource.bitmap);
        let templ = cv.matFromImageData(imageTemplate.bitmap);

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
        cv.rectangle(iSS, maxPoint, point, color, 2, cv.LINE_8, 0);

        //const outC = iSS[maxPoint, point];
        //const outC = iSS[maxPoint.x, maxPoint.y, point.x, point.y];

        console.log(maxPoint.x, maxPoint.y, point.x, point.y);


        iFour.crop(maxPoint.x * 2, maxPoint.y * 2, (point.x - maxPoint.x) * 2, (point.y - maxPoint.y) * 2, function (err) {
            if (err) throw err;
        }).write(__dirname + '/resized.jpg');


        //imageSource.write(__dirname + '/resized.jpg');


        new Jimp({
            width: iSS.cols,
            height: iSS.rows,
            data: Buffer.from(iSS.data)
        })
            .write(__dirname + '/template-matching.jpg');

    } catch (err) {
        console.log(cvTranslateError(cv, err));
    }
})();

/*         let x = ((maxPoint.x + point.x) / 2);
        console.log('x',x);
        let y = ((maxPoint.y + point.y) / 2);
        console.log('y',y); */

/* 
jimp 


image.crop( x, y, w, h );         // crop to the given region





 */

/*
opencv
result {
    minVal: -0.6468464136123657,
    maxVal: 0.8862791657447815,
    minLoc: { x: 194, y: 1640 },
    maxLoc: { x: 568, y: 1110 }
  }
  maxPoint { x: 568, y: 1110 }
  maxPoint { x: 568, y: 1110 }
  point Point { x: 599, y: 1141 }
  
        cv.rectangle(iSS, maxPoint, point, color, 2, cv.LINE_8, 0);

 void cv::rectangle 	( 	InputOutputArray  	
    img, iSS
    Point  	pt1, maxPoint
    Point  	pt2, point
    const Scalar &  	color,
    int  	thickness = 1,
    int  	lineType = LINE_8,
    int  	shift = 0 
) 		 */