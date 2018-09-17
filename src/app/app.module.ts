import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { SlideMenuModule } from './cuppa-ng2-slidemenu/slide-menu.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';
import { SortedTableComponent } from './playlist/sorted-table/sorted-table.component';
import { SearchResultComponent } from './playlist/search-result/search-result.component';
import { TrackCardComponent } from './playlist/track-card/track-card.component';
import { PhotosComponent } from './photos/photos.component';
import { RegistryComponent } from './registry/registry.component';
import { LinksComponent } from './header/links/links.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderService } from './header/header.service';
import { RsvpService } from './rsvp/rsvp.service';
import { EnvironmentInterceptor } from './core/environment.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		PlaylistComponent,
		AuthenticateComponent,
		HomeComponent,
		HeaderComponent,
		DetailsComponent,
		SortedTableComponent,
		SearchResultComponent,
		TrackCardComponent,
		PhotosComponent,
		RegistryComponent,
		LinksComponent,
		RsvpComponent,
		OurStoryComponent,
		ContactComponent,
		FooterComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		FormsModule,
		Angular2ImageGalleryModule,
		SlideMenuModule
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
