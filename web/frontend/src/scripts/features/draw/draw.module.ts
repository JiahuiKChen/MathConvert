import {NgModule} from "@angular/core";

import {DrawComponent} from "./draw.component";
import {SharedModule} from "../../shared/shared.module";
import {DrawRoutesModule} from "./draw.routes";
import {CanvasComponent} from "./canvas/canvas.component";
import {OutputComponent} from "./output/output.component";

/**
 * The main voting page.
 */
@NgModule({
    imports: [
        SharedModule,
        DrawRoutesModule,
    ],
    declarations: [
        DrawComponent,
        CanvasComponent,
        OutputComponent
    ],
    exports: [],
    providers: [],
})
export class DrawModule {
}
