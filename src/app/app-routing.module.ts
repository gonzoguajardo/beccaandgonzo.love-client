import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist/playlist.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { PhotosComponent } from './photos/photos.component';
import { RegistryComponent } from './registry/registry.component';
import { GuestBookComponent } from './guest-book/guest-book.component';
import { RsvpComponent } from './rsvp/rsvp.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'details', component: DetailsComponent},
    { path: 'photos', component: PhotosComponent},
    { path: 'registry', component: RegistryComponent},
    { path: 'guest-book', component: GuestBookComponent},
    { path: 'rsvp', component: RsvpComponent},
    { path: 'playlist', component: PlaylistComponent },
    { path: 'authenticate', component: AuthenticateComponent},
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
