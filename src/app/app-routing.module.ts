import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist/playlist.component';

const appRoutes: Routes = [
    { path: 'playlist', component: PlaylistComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
