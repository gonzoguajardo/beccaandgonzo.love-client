import { NgModule } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { PlaylistComponent } from './playlist.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SortedTableComponent } from './sorted-table/sorted-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrackCardComponent } from './track-card/track-card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule
	],
	exports: [
		PlaylistComponent, SearchResultComponent, SortedTableComponent
	],
	declarations: [
		PlaylistComponent, SearchResultComponent, SortedTableComponent, TrackCardComponent
	],
	providers: [
		PlaylistService
	]
})
export class PlaylistModule {

}
