import { SlideMenuComponent } from './slide-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './clickOutside';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [CommonModule, BrowserAnimationsModule],
	declarations: [SlideMenuComponent, ClickOutsideDirective],
	exports: [SlideMenuComponent, ClickOutsideDirective, BrowserAnimationsModule]
})
export class SlideMenuModule {
}
