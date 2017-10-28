import {Injectable} from '@angular/core';

@Injectable()
export class ImageService {

    public static getTrimmedCanvasImageData(canvas: HTMLCanvasElement): ImageData {
        let canvasContext = canvas.getContext('2d');
        let pixels = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        let bounds = {
                top: null,
                left: null,
                right: null,
                bottom: null
            };

        for (let i = 0; i < pixels.data.length; i += 4) {
            if (pixels.data[i+3] !== 0) {
                let x = (i / 4) % canvas.width;
                let y = ~~((i / 4) / canvas.width);

                if (bounds.top === null) {
                    bounds.top = y;
                }

                if (bounds.left === null) {
                    bounds.left = x;
                } else if (x < bounds.left) {
                    bounds.left = x;
                }

                if (bounds.right === null) {
                    bounds.right = x;
                } else if (bounds.right < x) {
                    bounds.right = x;
                }

                if (bounds.bottom === null) {
                    bounds.bottom = y;
                } else if (bounds.bottom < y) {
                    bounds.bottom = y;
                }
            }
        }

        let trimHeight = bounds.bottom - bounds.top;
        let trimWidth = bounds.right - bounds.left;

        return canvasContext.getImageData(bounds.left, bounds.top, trimWidth, trimHeight);
    }

    public static convertToGreyscale(canvas: HTMLCanvasElement) {
        let canvasContext = canvas.getContext("2d");
        let imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        let pixels  = imageData.data;

        for (let i = 0, n = pixels.length; i < n; i += 4) {
            let grayscale = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
            pixels[i  ] = grayscale;        // red
            pixels[i+1] = grayscale;        // green
            pixels[i+2] = grayscale;        // blue
            //pixels[i+3]              is alpha
        }

        //redraw the image in black & white
        canvasContext.putImageData(imageData, 0, 0);
    }

}