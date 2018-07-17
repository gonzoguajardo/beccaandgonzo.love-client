import { Injectable } from '@angular/core';

@Injectable()
export class WindowScrollingService {

	private readonly styleTag: HTMLStyleElement;

	constructor() {
		this.styleTag = this.buildStyleElement();
	}

	public disable(): void {
		document.body.appendChild(this.styleTag);
	}

	public enable(): void {
		document.body.removeChild(this.styleTag);
	}

	private buildStyleElement(): HTMLStyleElement {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.setAttribute('data-debug', 'Injected by WindowScrollingService service.');
		style.textContent = `
            body {
                overflow: hidden !important ;
            }
        `;
		return (style);

	}
}
