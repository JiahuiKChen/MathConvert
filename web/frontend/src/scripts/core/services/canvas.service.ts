import {Injectable} from '@angular/core';

@Injectable()
export class CanvasService {

    /**
     * Creates a scaled, square canvas with the contents of the provided canvas.
     * @param {HTMLCanvasElement} canvas The canvas to scale.
     * @param {number} dimensions The new square dimensions of the canvas.
     * @param {number} padding The px padding on all sides of the contents in the canvas. (Default no padding)
     * @returns {HTMLCanvasElement} The new, scaled canvas.
     */
    public static createScaledCanvas(canvas: HTMLCanvasElement, dimensions: number, padding: number = 0): HTMLCanvasElement {
        let scaledCanvas = document.createElement("canvas");

        scaledCanvas.width = dimensions;
        scaledCanvas.height = dimensions;

        let destDimensions = dimensions - (padding * 2);
        scaledCanvas.getContext("2d").drawImage(canvas, 0, 0, canvas.width, canvas.height, padding, padding, destDimensions, destDimensions);

        return scaledCanvas;
    }

    /**
     * Creates a canvas with the contents of the provided canvas, cropped to a square.
     *
     * @param canvas The canvas to crop.
     * @returns The new, cropped canvas.
     */
    public static createCroppedCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
        let trimmedImageData = CanvasService.trimCanvas(canvas);
        let croppedCanvas = document.createElement("canvas");

        let dimensions = Math.max(trimmedImageData.width, trimmedImageData.height);
        croppedCanvas.width = dimensions;
        croppedCanvas.height = dimensions;

        let offsetX = (dimensions - trimmedImageData.width) / 2;
        let offsetY = (dimensions - trimmedImageData.height) / 2;

        croppedCanvas.getContext("2d").putImageData(trimmedImageData, offsetX, offsetY);
        return croppedCanvas;
    }


    /**
     * Trims the given Canvas to the edges of its contents, where contents are defined as any non-transparent pixel.
     * The canvas is not modified; instead, its trimmed image data is returned.
     *
     * @param {HTMLCanvasElement} canvas The canvas to trim.
     * @returns {ImageData} The trimmed image data from the canvas.
     */
    private static trimCanvas(canvas: HTMLCanvasElement): ImageData {
        let canvasContext = canvas.getContext('2d');
        let pixels = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        let bounds = {
            top: null,
            left: null,
            right: null,
            bottom: null
        };

        for (let i = 0; i < pixels.data.length; i += 4) {
            if (pixels.data[i + 3] !== 0) {
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

    /**
     * Converts the drawing to be white on a black background.
     * @param {HTMLCanvasElement} canvas
     */
    public static convertCanvasToWhiteOnBlack(canvas: HTMLCanvasElement) {
        let canvasContext = canvas.getContext("2d");
        let imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imageData.data;

        // Scan over groups of 4 pixels (r g b a)
        for (let i = 0, n = pixels.length; i < n; i += 4) {
            // The intensity of RGB is determined by the transparency.
            // Fully transparent = fully black; Fully opaque = fully white.
            let intensity = pixels[i + 3];
            pixels[i] = intensity;
            pixels[i + 1] = intensity;
            pixels[i + 2] = intensity;
            pixels[i + 3] = 255;
        }

        // Draw the modified image data to the original canvas.
        canvasContext.putImageData(imageData, 0, 0);
    }

}