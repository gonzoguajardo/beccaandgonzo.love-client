import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderService } from '../header/header.service';

@Component({
	selector: 'app-cuppa-slidemenu',
	templateUrl: 'slidemenu.template.html',
	styleUrls: ['styles/hamburgers/settings.scss', 'styles/slidemenu.styles.scss'],
	animations: [
		trigger('toggleMenu', [
			state('show', style({height: '*'})),
			state('hide', style({height: 0})),
			transition('void => *', [
				style({height: 0, overflow: 'hidden'})
			]),
			transition('* => hide', [
				style({height: '*'}),
				animate(250, style({height: 0}))
			]),
			transition('hide => show', [
				style({height: 0}),
				animate(250, style({height: '*'}))
			])
		]),
		trigger('toggleArrow', [
			state('right', style({transform: 'rotate(0)'})),
			state('down', style({transform: 'rotate(90deg)'})),
			transition('right <=> down', animate('100ms ease-in'))
		])
	]
})

export class SlideMenuComponent implements AfterViewInit, OnInit, OnDestroy {

	@Input() menulist: any;

	@Input() config: any;

	@Output()
	open: EventEmitter<number> = new EventEmitter<number>();
	@Output()
	close: EventEmitter<number> = new EventEmitter<number>();
	@Output()
	onItemSelect: EventEmitter<number> = new EventEmitter<number>();
	menuState: boolean;
	overlayElem: any;
	defaultConfig: any = {
		'animation': 'collapse',
		'offset': {
			'top': 55
		},
		closeOnCLick: false
	};
	currentItem: any;

	constructor(private _elementRef: ElementRef, private sanitizer: DomSanitizer, private headerService: HeaderService) {
		headerService.menuOpenChange.subscribe((menuOpen: boolean) => {
			this.menuState = menuOpen;
		});

	}

	ngOnInit() {
		this.menuState = false;
		this.config = Object.assign(this.defaultConfig, this.config);
	}

	ngOnDestroy() {
		this.close.emit();
	}

	ngAfterViewInit() {

	}

	public menuToggle() {
		this.menuState = !this.menuState;
		if (this.menuState) {
			this.open.emit();
		} else {
			this.close.emit();
			this.closeMenu();
		}
	}

	public closeMenu() {
		this.menuState = false;
	}

	public openMenu() {
		this.menuState = false;
	}

	private onItemClick(item: any) {
		if (this.currentItem) {
			this.currentItem.active = this.currentItem.active ? false : true;

		}
		this.currentItem = item;
		item.active = true;
		if (item.subItems) {
			return false;
		} else {
			delete item['expand'];
			const obj = Object.assign(item);
			this.onItemSelect.emit(obj);
			if (this.config.closeOnCLick) {
				this.closeMenu();
				this.headerService.toggleMenuOpen();
			}
		}


	}

	private toggleSubMenu(item: any) {
		if (item.expand) {
			item.expand = item.expand === 'hide' ? 'show' : 'hide';
		} else {
			item.expand = 'show';
		}

	}

}
