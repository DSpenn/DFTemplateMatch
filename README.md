-tiles each is 256x256
2   16  | 4  x  4 |
3   64  | 8  x  8 || 2048 x 2048
        jpg => jpg 2898             
        png => png 8292
4:  256 | 16 x 16 |  4_0_0.jpg - 4_15_15.jpg    |  4096x4096
    => jpg => jpg 10822
    => jpg => png 33017
    => png => png 32935
    => png => jpg 10486
5: 1024 | 32 x 32 |  5_0_0.jpg - 5_31_31.jpg    | 8192 x 8192 | 30.3MB
      jpg 38680
6: 4096 | 64 x 64 |  6_0_0.jpg - 6_63_63.jpg    | 16384? x 16384 | 99.4MB




-maps scaled for 6 
        260x260ish with border
        250x250
        249x250  some black
        244x247
        244x244 *?
        243x242
        242x241
        233x239
        239x236?


methods = ['cv.TM_CCOEFF', 'cv.TM_CCOEFF_NORMED', 'cv.TM_CCORR',
            'cv.TM_CCORR_NORMED', 'cv.TM_SQDIFF', 'cv.TM_SQDIFF_NORMED']



x1     wxh 46x56
x2         42x48