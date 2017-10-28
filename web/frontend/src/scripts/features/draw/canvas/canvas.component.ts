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
     * The current position of the mouse on the canvas.
     */
    private mousePos = {x: 0, y: 0};

    /**
     * Flag for whether the left mouse button is up or down.
     */
    private mouseDown = false;

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
        this.mousePos.x = e.x - this.canvasContainer.nativeElement.offsetLeft;
        this.mousePos.y = e.y - this.canvasContainer.nativeElement.offsetTop;

        // Draw if left mouse button is down.
        if(this.mouseDown) {
            this.canvasContext.lineTo(this.mousePos.x, this.mousePos.y);
            this.canvasContext.stroke();
        }
    }

    /**
     * Called when the left mouse button is held down.
     */
    onMouseDown(e: MouseEvent) {
        this.mouseDown = true;

        // Start a path.
        this.canvasContext.moveTo(this.mousePos.x, this.mousePos.y);
        this.canvasContext.beginPath();
    }

    /**
     * Called when the left mouse button is released.
     */
    onMouseUp(e: MouseEvent) {
        this.mouseDown = false;

        // End the path.
        this.canvasContext.closePath();
    }
}