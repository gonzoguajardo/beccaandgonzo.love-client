import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'secret', component: HomeComponent, pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'photos', component: PhotosComponent},
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
