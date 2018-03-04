import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {

    router: Router;
    private menuItemsArray: any[] = [
        { 'title': 'Home', 'link': '/home' },
        { 'title': 'Our Story', 'link': '/our-story' },
        { 'title': 'Details', 'link': '/details' },
        { 'title': 'Photos', 'link': '/photos' },
        { 'title': 'Contact', 'link': '/contact' },
    ];
    private config = {
        closeOnCLick: true,
        offset: {
            top: 68
        }
    };
    private hamburgerMenu = false;

    constructor(router: Router) {
        this.router = router;
        this.scaleHeader();
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    private onItemSelect(item: any) {
        this.router.navigateByUrl(item['link']);
    }

    private scaleHeader() {
        this.hamburgerMenu = window.innerWidth < 420;
    }

    @HostListener('window:resize', ['$event'])
    sizeChange(event) {
        this.scaleHeader();
    }

}
