import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {
        path: 'draw',
        loadChildren: './features/draw/draw.module#DrawModule'
    },
    {
        path: '**',
        redirectTo: 'draw',
        pathMatch: 'full'
    }
];

/**
 * The root routing module. Other routes can be found next to their respective features.
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutesModule {
}