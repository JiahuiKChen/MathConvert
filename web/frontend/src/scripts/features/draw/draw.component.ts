import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {OutputComponent} from "./output/output.component";

@Component({
    selector: 'math-draw',
    templateUrl: 'draw.component.html',
    styleUrls: ['draw.component.css']
})
export class DrawComponent implements AfterViewInit {

    @ViewChild(OutputComponent)
    private output: OutputComponent;

    ngAfterViewInit(): void {
    }

}