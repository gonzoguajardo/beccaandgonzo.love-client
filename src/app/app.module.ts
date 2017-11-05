import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistTableComponent } from './playlist/table/playlist-table.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';
import { SortedTableComponent } from './playlist/sorted-table/sorted-table.component';
import { SearchResultComponent } from './playlist/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlaylistTableComponent,
    AuthenticateComponent,
    HomeComponent,
    HeaderComponent,
    DetailsComponent,
    SortedTableComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    DataTableModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
