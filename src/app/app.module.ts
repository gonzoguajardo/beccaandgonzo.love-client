import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { SlideMenuModule } from './cuppa-ng2-slidemenu/slide-menu.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PhotosComponent } from './photos/photos.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderService } from './header/header.service';
import { HeaderModule } from './header/header.module';
import { VideoComponent } from './video/video.component';

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		Angular2ImageGalleryModule,
		SlideMenuModule,
		HeaderModule,
		AppRoutingModule,
	],
	declarations: [
		AppComponent,
		HomeComponent,
		PhotosComponent,
		ContactComponent,
		FooterComponent,
		VideoComponent,
	],
	providers: [HeaderService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
