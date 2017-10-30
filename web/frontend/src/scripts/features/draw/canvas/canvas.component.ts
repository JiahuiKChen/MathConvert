import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {CanvasService} from "../../../core/services/canvas.service";
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
     * Emits the drawn image as processed for , and clears the canvas once emitted.
     */
    private emitImage(): void {
        this.convertCanvasToProcessedImage()
            .then(image => {
                // Clear
                this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

                // Send image to listeners.
                this.drawn.emit(image);
            })
    }

    /**
     * Converts the current contents of the canvas element to an image that is prepared for analysis by the server.
     * @returns {Promise<Blob>} A Promise that will emit the PNG blob when complete.
     */
    private convertCanvasToProcessedImage(): Promise<Blob> {
        return new Promise<Blob>(resolve => {
            // Crop the canvas
            let croppedCanvas = CanvasService.createCroppedCanvas(this.canvas);

            // Scale the canvas
            let scaledCanvas = CanvasService.createScaledCanvas(croppedCanvas, 28, 3);

            // Make the canvas black and white
            CanvasService.convertCanvasToWhiteOnBlack(scaledCanvas);

            // Convert the canvas to a PNG blob.
            scaledCanvas.toBlob(result => resolve(result), "image/png");
        })
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