import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {OutputComponent} from "./output/output.component";
import {CanvasComponent} from "./canvas/canvas.component";

@Component({
    selector: 'math-draw',
    templateUrl: 'draw.component.html',
    styleUrls: ['draw.component.css']
})
export class DrawComponent implements AfterViewInit {

    @ViewChild(CanvasComponent)
    private canvas: CanvasComponent;

    @ViewChild(OutputComponent)
    private output: OutputComponent;

    ngAfterViewInit(): void {
    }

    /**
     * Called when an image is drawn.
     */
    onDrawn(image: Blob) {
        this.output.appendCharacter("ha");
    }

}