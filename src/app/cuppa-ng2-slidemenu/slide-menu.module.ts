import { SlideMenu } from "./slideMenu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { ClickOutsideDirective } from "./clickOutside";
import { NgModule } from "@angular/core";

@NgModule({
	imports: [CommonModule, BrowserAnimationsModule],
	declarations: [SlideMenu, ClickOutsideDirective],
	exports: [SlideMenu, ClickOutsideDirective, BrowserAnimationsModule]
})
export class SlideMenuModule {
}