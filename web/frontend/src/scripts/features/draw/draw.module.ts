import {NgModule} from "@angular/core";

import {DrawComponent} from "./draw.component";
import {SharedModule} from "../../shared/shared.module";
import {DrawRoutesModule} from "./draw.routes";

/**
 * The main voting page.
 */
@NgModule({
    imports: [
        SharedModule,
        DrawRoutesModule
    ],
    declarations: [
        DrawComponent
    ],
    exports: [],
    providers: [],
})
export class DrawModule {
}
