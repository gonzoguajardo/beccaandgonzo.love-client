import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from './header';
import { HeaderService } from './header.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {

	readonly headerWidth = 650;

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

	constructor(private router: Router, private headerService: HeaderService) {
		this.scaleHeader();
		headerService.menuOpenChange.subscribe((menuOpen: boolean) => {
			this.menuOpen = menuOpen;
		});
	}

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
	}

	onItemSelect(item: any) {
		// noinspection JSIgnoredPromiseFromCall
		this.router.navigateByUrl(item['link']);
	}

	open() {
		if (!this.menuOpen) {
			this.headerService.toggleMenuOpen();
		}
	}

	close() {
		if (this.menuOpen) {
			this.headerService.toggleMenuOpen();
		}
	}

	private scaleHeader() {
		const newHamburgerMenu = window.innerWidth < this.headerWidth;
		if (this.hamburgerMenu !== newHamburgerMenu) {
			if (!newHamburgerMenu && this.menuOpen) {
				this.headerService.toggleMenuOpen();
			}
		}
		this.hamburgerMenu = newHamburgerMenu;
	}

	@HostListener('window:resize', ['$event'])
	sizeChange(event) {
		this.scaleHeader();
	}

}
