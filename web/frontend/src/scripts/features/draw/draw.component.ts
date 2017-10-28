import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {OutputComponent} from "./output/output.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {ParseService} from "../../core/services/parse.service";

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

    constructor(private parseService: ParseService) {

    }

    ngAfterViewInit(): void {
    }

    /**
     * Called when an image is drawn.
     */
    onDrawn(image: Blob) {
        this.parseService.parseImage(image)
            .then(char => {
                console.log(char);
                this.output.appendCharacter(char['letter'] != null ? char['letter'] : '?')
            })
            .catch(err => console.error(err))
    }

}