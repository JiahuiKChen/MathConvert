import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {ImageService} from "../../../core/services/image.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'math-canvas',
    templateUrl: 'canvas.component.html',
    styleUrls: ['canvas.component.css']
})

export class CanvasComponent implements AfterViewInit {

    @Output()
    public drawn = new EventEmitter<any>();

    /**
     * The canvas element reference.
     */
    @ViewChild("canvas")
    private canvasRef: ElementRef;

    /**
     * The canvas' container element reference.
     */
    @ViewChild("container")
    private canvasContainer: ElementRef;

    /**
     * The canvas itself.
     */
    private canvas: HTMLCanvasElement;

    /**
     * The canvas rendering context for drawing.
     */
    private canvasContext: CanvasRenderingContext2D;

    /**
     * Contains current configuration for drawing, including:
     * - The x and y position to draw at.
     * - A flag that determines if drawing is turned on.
     */
    private drawConfig = {x: 0, y: 0, draw: false};

    /**
     * The subscription to the emit timer which will emit the image after a period of inactivity.
     */
    private emitTimer: Subscription;

    ngAfterViewInit(): void {
        this.canvas = this.canvasRef.nativeElement;
        this.canvasContext = this.canvas.getContext("2d");

        // Size of canvas
        let computedSize = getComputedStyle(this.canvasContainer.nativeElement);
        this.canvas.width = parseInt(computedSize.width);
        this.canvas.height = parseInt(computedSize.height);

        // Canvas context (drawing) settings
        this.canvasContext.lineWidth = 10;
        this.canvasContext.lineJoin = "round";
        this.canvasContext.lineCap = "round";
        this.canvasContext.strokeStyle = "#00CC99";
    }

    /**
     * Emits the drawn image, and clears the canvas once emitted.
     */
    private emitImage(): void {
        let trimmedImageData = ImageService.getTrimmedCanvasImageData(this.canvas);

        // Create a new temporary canvas for the trimmed data.
        let trimmedCanvas = document.createElement("canvas");
        let trimmedCanvasContext = trimmedCanvas.getContext("2d");

        trimmedCanvas.width = trimmedImageData.width;
        trimmedCanvas.height = trimmedImageData.height;

        trimmedCanvasContext.putImageData(trimmedImageData, 0, 0);

        // Scale the image
        let scaledCanvas = document.createElement("canvas");
        let scaledCanvasContext = scaledCanvas.getContext("2d");

        scaledCanvas.width = 45;
        scaledCanvas.height = 45;

        scaledCanvasContext.drawImage(trimmedCanvas, 0, 0, trimmedCanvas.width, trimmedCanvas.height, 0, 0, 45, 45);

        // To BW
        ImageService.convertToBlackAndWhite(scaledCanvas);

        scaledCanvas.toBlob(img => {
                this.drawn.emit(img);

                // Clear
                this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

                // Clean up
                document.removeChild(trimmedCanvas);
                document.removeChild(scaledCanvas);

            }, "image/jpeg", 1.0
        );
    }

    /**
     * Called when the mouse is moved over the canvas.
     */
    onMouseMove(e: MouseEvent) {
        this.drawConfig.x = e.x - this.canvasContainer.nativeElement.offsetLeft;
        this.drawConfig.y = e.y - this.canvasContainer.nativeElement.offsetTop;

        this.drawStroke();
    }

    /**
     * Called when a touch is moved over the canvas.
     */
    onTouchMove(e: TouchEvent) {
        this.drawConfig.x = e.touches[0].clientX - this.canvasContainer.nativeElement.offsetLeft;
        this.drawConfig.y = e.touches[0].clientY - this.canvasContainer.nativeElement.offsetTop;

        this.drawStroke();
    }

    /**
     * Call when drawing should start.
     */
    startDrawing() {
        this.drawConfig.draw = true;

        // Stop timer
        if (this.emitTimer != null) {
            this.emitTimer.unsubscribe();
            this.emitTimer = null;
        }

        // Start a path.
        this.canvasContext.moveTo(this.drawConfig.x, this.drawConfig.y);
        this.canvasContext.beginPath();
    }

    /**
     * Call when drawing should end.
     */
    endDrawing() {
        this.drawConfig.draw = false;

        // Start timer
        this.emitTimer = Observable.timer(500).subscribe(
            () => this.emitImage()
        );

        // End the path.
        this.canvasContext.closePath();
    }

    /**
     * Draws a stroke on the screen if the mouse is currently down.
     */
    private drawStroke() {
        // Draw if left mouse button is down.
        if (this.drawConfig.draw) {
            this.canvasContext.lineTo(this.drawConfig.x, this.drawConfig.y);
            this.canvasContext.stroke();
        }
    }
}