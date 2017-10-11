import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {DataTableModule} from 'angular2-datatable';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    DataTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
