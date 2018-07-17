import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

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

	@Output('open')
	open: EventEmitter<number> = new EventEmitter<number>();
	@Output('close')
	close: EventEmitter<number> = new EventEmitter<number>();
	@Output()
	onItemSelect: EventEmitter<number> = new EventEmitter<number>();
	menuState: boolean;
	targetElement: any;
	overlayElem: any;
	defaultConfig: any = {
		'animation': 'collapse',
		'offset': {
			'top': 55
		},
		closeOnCLick: false
	};
	currentItem: any;

	constructor(private _elementRef: ElementRef, private sanitizer: DomSanitizer) {
		this.overlayElem = document.getElementById('cuppa-menu-overlay');
	}

	ngOnInit() {
		this.menuState = false;
		this.config = Object.assign(this.defaultConfig, this.config);
		this.addOverlayElement();
	}

	ngOnDestroy() {
		this.close.emit();
	}

	ngAfterViewInit() {

	}

	public menuToggle() {
		this.menuState = !this.menuState;
		// this.toggleOverlay();
		if (this.menuState) {
			this.open.emit();
			document.getElementById('cuppa-menu-overlay').style['opacity'] = '1';
		} else {
			this.close.emit();
			this.closeMenu();
		}
	}

	public closeMenu() {
		this.menuState = false;
		// this.overlayElem.style['opacity'] = 0;
		document.getElementById('cuppa-menu-overlay').style['opacity'] = '0';
	}

	public openMenu() {
		this.menuState = false;
		this.overlayElem.style['opacity'] = 0;
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

	private addOverlayElement() {
	}

	private toggleOverlay() {
		this.overlayElem = document.getElementById('cuppa-menu-overlay');
		const styleElement = this.overlayElem.style['opacity'];
		if (styleElement === '0') {
			this.overlayElem.style['opacity'] = 1;
		} else if (styleElement === '1') {
			this.overlayElem.style['opacity'] = 0;
		}
	}
}
