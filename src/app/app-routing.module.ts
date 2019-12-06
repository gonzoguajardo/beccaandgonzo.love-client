import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { ContactComponent } from './contact/contact.component';
import { VideoComponent } from './video/video.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'home', component: HomeComponent},
	{path: 'photos', component: PhotosComponent},
	{path: 'video', component: VideoComponent},
	{path: 'contact', component: ContactComponent},
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			appRoutes,
			{useHash: true}
		)
	],
	exports: [
		RouterModule
	],
	providers: []
})
export class AppRoutingModule {
}
