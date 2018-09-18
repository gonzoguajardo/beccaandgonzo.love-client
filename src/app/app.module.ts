import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { SlideMenuModule } from './cuppa-ng2-slidemenu/slide-menu.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { TrackCardComponent } from './playlist/track-card/track-card.component';
import { PhotosComponent } from './photos/photos.component';
import { RegistryComponent } from './registry/registry.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderService } from './header/header.service';
import { RsvpService } from './rsvp/rsvp.service';
import { EnvironmentInterceptor } from './core/environment.interceptor';
import { HeaderModule } from './header/header.module';
import { PlaylistModule } from './playlist/playlist.module';

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		Angular2ImageGalleryModule,
		SlideMenuModule,
		HeaderModule,
		PlaylistModule,

		AppRoutingModule,
	],
	declarations: [
		AppComponent,
		AuthenticateComponent,
		HomeComponent,
		DetailsComponent,
		PhotosComponent,
		RegistryComponent,
		RsvpComponent,
		OurStoryComponent,
		ContactComponent,
		FooterComponent,
	],
	providers: [HeaderService, RsvpService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: EnvironmentInterceptor,
			multi: true
		}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
