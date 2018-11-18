import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { LinksComponent } from './links/links.component';
import { SlideMenuModule } from '../cuppa-ng2-slidemenu';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		SlideMenuModule,
		RouterModule
	],
	exports: [
		HeaderComponent,
		LinksComponent
	],
	declarations: [
		HeaderComponent,
		LinksComponent
	]
})
export class HeaderModule {

}
