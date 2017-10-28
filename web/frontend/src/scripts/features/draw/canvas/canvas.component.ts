import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'math-canvas',
    templateUrl: 'canvas.component.html'
})

export class CanvasComponent implements AfterViewInit {

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

        // Start a path.
        this.canvasContext.moveTo(this.drawConfig.x, this.drawConfig.y);
        this.canvasContext.beginPath();
    }

    /**
     * Call when drawing should end.
     */
    endDrawing() {
        this.drawConfig.draw = false;

        // End the path.
        this.canvasContext.closePath();
    }

    /**
     * Draws a stroke on the screen if the mouse is currently down.
     */
    private drawStroke() {
        // Draw if left mouse button is down.
        if(this.drawConfig.draw) {
            this.canvasContext.lineTo(this.drawConfig.x, this.drawConfig.y);
            this.canvasContext.stroke();
        }
    }
}