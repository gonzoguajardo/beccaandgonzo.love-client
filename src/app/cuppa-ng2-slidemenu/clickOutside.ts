import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Directive({
	selector: '[clickOutside]'
})
export class ClickOutsideDirective {
	constructor(private _elementRef: ElementRef, private headerService: HeaderService) {
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
			if (this.headerService.isMenuOpen()) {
				this.headerService.toggleMenuOpen();
			}
		}
	}
}
