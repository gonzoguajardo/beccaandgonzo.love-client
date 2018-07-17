import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { WindowScrollingService } from '../header/window-scrolling.service';

@Directive({
	selector: '[clickOutside]'
})
export class ClickOutsideDirective {
	constructor(private _elementRef: ElementRef, private windowScrollingService: WindowScrollingService) {
	}

	@Output()
	public clickOutside = new EventEmitter<MouseEvent>();

	@HostListener('document:click', ['$event', '$event.target'])
	public onClick(event: MouseEvent, targetElement: HTMLElement): void {
		if (!targetElement) {
			return;
		}

		const clickedInside = this._elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.clickOutside.emit(event);
			this.windowScrollingService.enable();
		}
	}
}
