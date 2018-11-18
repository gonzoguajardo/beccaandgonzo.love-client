import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { PhotosComponent } from './photos/photos.component';
import { RegistryComponent } from './registry/registry.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { ContactComponent } from './contact/contact.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './user/admin.guard';
import { LoginComponent } from './login/login.component';
import { MiamiComponent } from './miami/miami.component';

const appRoutes: Routes = [
	// { path: '', redirectTo: '/a', pathMatch: 'full' },
	{path: '', component: HomeComponent},
	{path: 'secret', component: HomeComponent, pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'our-story', component: OurStoryComponent},
	{path: 'details', component: DetailsComponent},
	{path: 'rsvp', component: RsvpComponent},
	{path: 'miami', component: MiamiComponent},
	{path: 'photos', component: PhotosComponent},
	{path: 'registry', component: RegistryComponent},
	{path: 'contact', component: ContactComponent},
	{path: 'login', component: LoginComponent},
	{path: 'authenticate', component: AuthenticateComponent},
	{path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
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
	providers: [

	]
})
export class AppRoutingModule {
}
