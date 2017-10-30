import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {OutputComponent} from "./output/output.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {ParseService} from "../../core/services/parse.service";
import {LoaderService} from "../../core/services/loader.service";

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

    constructor(private parseService: ParseService,
                private loaderService: LoaderService) {

    }

    ngAfterViewInit(): void {
    }

    /**
     * Called when an image is drawn.
     */
    onDrawn(image: Blob) {
        this.loaderService.startLoading();
        this.parseService.parseImage(image)
            .then(char => {
                this.loaderService.stopLoading();
                this.output.appendCharacter(char['letter'] != null ? char['letter'] : '?')
            })
            .catch(err => {
                this.loaderService.stopLoading();
                console.error(err)
            })
    }

}