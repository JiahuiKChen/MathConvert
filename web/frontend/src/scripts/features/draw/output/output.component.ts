import {Component} from '@angular/core';

@Component({
    selector: 'math-output',
    templateUrl: 'output.component.html',
    styleUrls: ['output.component.css']
})

export class OutputComponent {

    public content: string = "";

    /**
     * Appends a character to the output.
     */
    public appendCharacter(c: string): void {
        this.content += c;
    }

}