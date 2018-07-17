import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from './header';
import { WindowScrollingService } from './window-scrolling.service';
import { HeaderService } from './header.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {

	readonly headerWidth = 570;

	@Input()
	headers: Header[];

	hamburgerConfig = {
		closeOnCLick: true,
		offset: {
			top: 62
		}
	};
	hamburgerMenu = false;
	menuOpen: boolean;
	scrollBarRemoved: boolean;

	constructor(private router: Router, private windowScrollingService: WindowScrollingService, private headerService: HeaderService) {
		this.scaleHeader();
		headerService.isMenuOpenChange.subscribe((menuOpen: boolean) => {
			this.menuOpen = menuOpen;
		});
	}

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
	}

	onItemSelect(item: any) {
		this.router.navigateByUrl(item['link']);
	}

	open() {
		if (!this.menuOpen) {
			this.windowScrollingService.disable();
			this.headerService.toggleMenuOpen();
			this.scrollBarRemoved = true;
		}
	}

	close() {
		if (this.menuOpen) {
			this.headerService.toggleMenuOpen();
			if (this.scrollBarRemoved) {
				this.windowScrollingService.enable();
			}
		}
	}

	private scaleHeader() {
		this.hamburgerMenu = window.innerWidth < this.headerWidth;
	}

	@HostListener('window:resize', ['$event'])
	sizeChange(event) {
		this.scaleHeader();
	}

}
