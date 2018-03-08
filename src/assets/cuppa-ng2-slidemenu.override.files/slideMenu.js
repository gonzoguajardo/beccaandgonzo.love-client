import { Component, NgModule, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ClickOutsideDirective } from './clickOutside';
var SlideMenu = /** @class */ (function () {
    function SlideMenu(_elementRef, sanitizer) {
        this._elementRef = _elementRef;
        this.sanitizer = sanitizer;
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.itemSelect = new EventEmitter();
        this.defaultConfig = {
            "animation": "collapse",
            "offset": {
                "top": 55
            },
            closeOnCLick: false
        };
    }
    SlideMenu.prototype.ngOnInit = function () {
        this.menuState = false;
        this.config = Object.assign(this.defaultConfig, this.config);
        this.addOverlayElement();
    };
    SlideMenu.prototype.ngAfterViewInit = function () {
    };
    SlideMenu.prototype.menuToggle = function () {
        this.menuState = !this.menuState;
        this.toggleOverlay();
        if (this.menuState) {
            this.open.emit();
        }
        else {
            this.close.emit();
        }
    };
    SlideMenu.prototype.closeMenu = function () {
        this.menuState = false;
        this.overlayElem.style['opacity'] = 0;
    };
    SlideMenu.prototype.onItemClick = function (item) {
        if (this.currentItem) {
            this.currentItem.active = this.currentItem.active ? false : true;
        }
        this.currentItem = item;
        item.active = true;
        if (item.subItems) {
            return false;
        }
        else {
            delete item["expand"];
            var obj = Object.assign(item);
            this.itemSelect.emit(obj);
            if (this.config.closeOnCLick) {
                this.closeMenu();
            }
        }
    };
    SlideMenu.prototype.toggleSubMenu = function (item) {
        if (item.expand) {
            item.expand = item.expand == 'hide' ? 'show' : 'hide';
        }
        else {
            item.expand = 'show';
        }
    };
    SlideMenu.prototype.addOverlayElement = function () {
        this.overlayElem = document.createElement('div');
        this.overlayElem.classList.add('cuppa-menu-overlay');
        this.overlayElem.style['position'] = 'fixed';
        this.overlayElem.style['background'] = 'rgba(0, 0, 0, 0.7)';
        this.overlayElem.style['top'] = this.config.offset.top + 'px';
        this.overlayElem.style['left'] = 0;
        this.overlayElem.style['right'] = 0;
        this.overlayElem.style['bottom'] = 0;
        this.overlayElem.style['opacity'] = 0;
        this.overlayElem.style['pointer-events'] = 'none';
        this.overlayElem.style['transition'] = 'all .2s linear';
        document.getElementsByTagName('body')[0].appendChild(this.overlayElem);
    };
    SlideMenu.prototype.toggleOverlay = function () {
        if (this.overlayElem.style['opacity'] == 0) {
            this.overlayElem.style['opacity'] = 1;
        }
        else if (this.overlayElem.style['opacity'] == 1) {
            this.overlayElem.style['opacity'] = 0;
        }
    };
    SlideMenu.decorators = [
        { type: Component, args: [{
                    selector: 'cuppa-slidemenu',
                    template: "\n      <span (clickOutside)=\"closeMenu()\">\n          <button (click)=\"menuToggle()\" class=\"hamburger hamburger--{{config.animation}}\" [ngClass]=\"{'is-active': menuState, '': !menuState}\">\n        <span class=\"hamburger-box\">\n          <span class=\"hamburger-inner\"></span>\n      </span>\n      </button>\n      <div class=\"menu-container cuppa-menu\" [ngClass]=\"{'show-menu': menuState, 'hide-menu': !menuState}\" [ngStyle]=\"{'top':config.offset.top+'px'}\">\n          <ul>\n              <li *ngFor=\"let item of menulist\">\n                  <a *ngIf=\"item.subItems\" (click)=\"toggleSubMenu(item)\">{{item.title}} \n                      <i *ngIf=\"item.subItems\" class=\"fa fa-angle-right\" [@toggleArrow]=\"item.expand == 'show' ? 'down': 'right'\"></i>\n                  </a>\n                  <a *ngIf=\"!item.subItems\" [ngClass]=\"{'active': item.active}\" (click)=\"onItemClick(item)\">{{item.title}} </a>\n                  <ul *ngIf=\"item.subItems\" class=\"sub-menu\" [@toggleMenu]=\"item.expand == undefined ? 'hide': item.expand\">\n\n                      <li *ngFor=\"let subitem of item.subItems\"><a (click)=\"onItemClick(subitem)\" [ngClass]=\"{'active': subitem.active}\">{{subitem.title}}</a></li>\n                  </ul>\n              </li>\n          </ul>\n      </div>\n      <span>\n      <!--<div class=\"cuppa-menu-overlay\" [ngClass]=\"{'show-overlay': menuState, 'hide-overlay': !menuState}\"></div> -->\n    ",
                    styles: ["\n      /*!\n       * Hamburgers\n       * @description Tasty CSS-animated hamburgers\n       * @author Jonathan Suh @jonsuh\n       * @site https://jonsuh.com/hamburgers\n       * @link https://github.com/jonsuh/hamburgers\n       */.hamburger{padding:15px 15px;display:inline-block;cursor:pointer;transition-property:opacity, filter;transition-duration:.15s;transition-timing-function:linear;font:inherit;color:inherit;text-transform:none;background-color:transparent;border:0;margin:0;overflow:visible}.hamburger:hover{opacity:.7}.hamburger:focus{outline:none}.hamburger-box{width:40px;height:24px;display:block;position:relative}.hamburger-inner{display:block;top:50%;margin-top:-2px}.hamburger-inner,.hamburger-inner::before,.hamburger-inner::after{width:40px;height:4px;background-color:#333;border-radius:4px;position:absolute;transition-property:transform;transition-duration:0.15s;transition-timing-function:ease}.hamburger-inner::before,.hamburger-inner::after{content:\"\";display:block}.hamburger-inner::before{top:-10px}.hamburger-inner::after{bottom:-10px}.hamburger--3dx .hamburger-box{perspective:80px}.hamburger--3dx .hamburger-inner{transition:transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),background-color 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dx .hamburger-inner::before,.hamburger--3dx .hamburger-inner::after{transition:transform 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dx.is-active .hamburger-inner{background-color:transparent;transform:rotateY(180deg)}.hamburger--3dx.is-active .hamburger-inner::before{transform:translate3d(0, 10px, 0) rotate(45deg)}.hamburger--3dx.is-active .hamburger-inner::after{transform:translate3d(0, -10px, 0) rotate(-45deg)}.hamburger--3dx-r .hamburger-box{perspective:80px}.hamburger--3dx-r .hamburger-inner{transition:transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),background-color 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dx-r .hamburger-inner::before,.hamburger--3dx-r .hamburger-inner::after{transition:transform 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dx-r.is-active .hamburger-inner{background-color:transparent;transform:rotateY(-180deg)}.hamburger--3dx-r.is-active .hamburger-inner::before{transform:translate3d(0, 10px, 0) rotate(45deg)}.hamburger--3dx-r.is-active .hamburger-inner::after{transform:translate3d(0, -10px, 0) rotate(-45deg)}.hamburger--3dy .hamburger-box{perspective:80px}.hamburger--3dy .hamburger-inner{transition:transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),background-color 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dy .hamburger-inner::before,.hamburger--3dy .hamburger-inner::after{transition:transform 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dy.is-active .hamburger-inner{background-color:transparent;transform:rotateX(-180deg)}.hamburger--3dy.is-active .hamburger-inner::before{transform:translate3d(0, 10px, 0) rotate(45deg)}.hamburger--3dy.is-active .hamburger-inner::after{transform:translate3d(0, -10px, 0) rotate(-45deg)}.hamburger--3dy-r .hamburger-box{perspective:80px}.hamburger--3dy-r .hamburger-inner{transition:transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),background-color 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dy-r .hamburger-inner::before,.hamburger--3dy-r .hamburger-inner::after{transition:transform 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dy-r.is-active .hamburger-inner{background-color:transparent;transform:rotateX(180deg)}.hamburger--3dy-r.is-active .hamburger-inner::before{transform:translate3d(0, 10px, 0) rotate(45deg)}.hamburger--3dy-r.is-active .hamburger-inner::after{transform:translate3d(0, -10px, 0) rotate(-45deg)}.hamburger--3dxy .hamburger-box{perspective:80px}.hamburger--3dxy .hamburger-inner{transition:transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),background-color 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dxy .hamburger-inner::before,.hamburger--3dxy .hamburger-inner::after{transition:transform 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dxy.is-active .hamburger-inner{background-color:transparent;transform:rotateX(180deg) rotateY(180deg)}.hamburger--3dxy.is-active .hamburger-inner::before{transform:translate3d(0, 10px, 0) rotate(45deg)}.hamburger--3dxy.is-active .hamburger-inner::after{transform:translate3d(0, -10px, 0) rotate(-45deg)}.hamburger--3dxy-r .hamburger-box{perspective:80px}.hamburger--3dxy-r .hamburger-inner{transition:transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),background-color 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dxy-r .hamburger-inner::before,.hamburger--3dxy-r .hamburger-inner::after{transition:transform 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1)}.hamburger--3dxy-r.is-active .hamburger-inner{background-color:transparent;transform:rotateX(180deg) rotateY(180deg) rotateZ(-180deg)}.hamburger--3dxy-r.is-active .hamburger-inner::before{transform:translate3d(0, 10px, 0) rotate(45deg)}.hamburger--3dxy-r.is-active .hamburger-inner::after{transform:translate3d(0, -10px, 0) rotate(-45deg)}.hamburger--arrow.is-active .hamburger-inner::before{transform:translate3d(-8px, 0, 0) rotate(-45deg) scale(0.7, 1)}.hamburger--arrow.is-active .hamburger-inner::after{transform:translate3d(-8px, 0, 0) rotate(45deg) scale(0.7, 1)}.hamburger--arrow-r.is-active .hamburger-inner::before{transform:translate3d(8px, 0, 0) rotate(45deg) scale(0.7, 1)}.hamburger--arrow-r.is-active .hamburger-inner::after{transform:translate3d(8px, 0, 0) rotate(-45deg) scale(0.7, 1)}.hamburger--arrowalt .hamburger-inner::before{transition:top 0.1s 0.1s ease,transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1)}.hamburger--arrowalt .hamburger-inner::after{transition:bottom 0.1s 0.1s ease,transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1)}.hamburger--arrowalt.is-active .hamburger-inner::before{top:0;transform:translate3d(-8px, -10px, 0) rotate(-45deg) scale(0.7, 1);transition:top 0.1s ease,transform 0.1s 0.1s cubic-bezier(0.895, 0.03, 0.685, 0.22)}.hamburger--arrowalt.is-active .hamburger-inner::after{bottom:0;transform:translate3d(-8px, 10px, 0) rotate(45deg) scale(0.7, 1);transition:bottom 0.1s ease,transform 0.1s 0.1s cubic-bezier(0.895, 0.03, 0.685, 0.22)}.hamburger--arrowalt-r .hamburger-inner::before{transition:top 0.1s 0.1s ease,transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1)}.hamburger--arrowalt-r .hamburger-inner::after{transition:bottom 0.1s 0.1s ease,transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1)}.hamburger--arrowalt-r.is-active .hamburger-inner::before{top:0;transform:translate3d(8px, -10px, 0) rotate(45deg) scale(0.7, 1);transition:top 0.1s ease,transform 0.1s 0.1s cubic-bezier(0.895, 0.03, 0.685, 0.22)}.hamburger--arrowalt-r.is-active .hamburger-inner::after{bottom:0;transform:translate3d(8px, 10px, 0) rotate(-45deg) scale(0.7, 1);transition:bottom 0.1s ease,transform 0.1s 0.1s cubic-bezier(0.895, 0.03, 0.685, 0.22)}.hamburger--arrowturn.is-active .hamburger-inner{transform:rotate(-180deg)}.hamburger--arrowturn.is-active .hamburger-inner::before{transform:translate3d(8px, 0, 0) rotate(45deg) scale(0.7, 1)}.hamburger--arrowturn.is-active .hamburger-inner::after{transform:translate3d(8px, 0, 0) rotate(-45deg) scale(0.7, 1)}.hamburger--arrowturn-r.is-active .hamburger-inner{transform:rotate(-180deg)}.hamburger--arrowturn-r.is-active .hamburger-inner::before{transform:translate3d(-8px, 0, 0) rotate(-45deg) scale(0.7, 1)}.hamburger--arrowturn-r.is-active .hamburger-inner::after{transform:translate3d(-8px, 0, 0) rotate(45deg) scale(0.7, 1)}.hamburger--boring .hamburger-inner,.hamburger--boring .hamburger-inner::before,.hamburger--boring .hamburger-inner::after{transition-property:none}.hamburger--boring.is-active .hamburger-inner{transform:rotate(45deg)}.hamburger--boring.is-active .hamburger-inner::before{top:0;opacity:0}.hamburger--boring.is-active .hamburger-inner::after{bottom:0;transform:rotate(-90deg)}.hamburger--collapse .hamburger-inner{top:auto;bottom:0;transition-duration:0.13s;transition-delay:0.13s;transition-timing-function:cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--collapse .hamburger-inner::after{top:-20px;transition:top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),opacity 0.1s linear}.hamburger--collapse .hamburger-inner::before{transition:top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--collapse.is-active .hamburger-inner{transform:translate3d(0, -10px, 0) rotate(-45deg);transition-delay:0.22s;transition-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--collapse.is-active .hamburger-inner::after{top:0;opacity:0;transition:top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),opacity 0.1s 0.22s linear}.hamburger--collapse.is-active .hamburger-inner::before{top:0;transform:rotate(-90deg);transition:top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--collapse-r .hamburger-inner{top:auto;bottom:0;transition-duration:0.13s;transition-delay:0.13s;transition-timing-function:cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--collapse-r .hamburger-inner::after{top:-20px;transition:top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),opacity 0.1s linear}.hamburger--collapse-r .hamburger-inner::before{transition:top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--collapse-r.is-active .hamburger-inner{transform:translate3d(0, -10px, 0) rotate(45deg);transition-delay:0.22s;transition-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--collapse-r.is-active .hamburger-inner::after{top:0;opacity:0;transition:top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),opacity 0.1s 0.22s linear}.hamburger--collapse-r.is-active .hamburger-inner::before{top:0;transform:rotate(90deg);transition:top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--elastic .hamburger-inner{top:2px;transition-duration:0.275s;transition-timing-function:cubic-bezier(0.68, -0.55, 0.265, 1.55)}.hamburger--elastic .hamburger-inner::before{top:10px;transition:opacity 0.125s 0.275s ease}.hamburger--elastic .hamburger-inner::after{top:20px;transition:transform 0.275s cubic-bezier(0.68, -0.55, 0.265, 1.55)}.hamburger--elastic.is-active .hamburger-inner{transform:translate3d(0, 10px, 0) rotate(135deg);transition-delay:0.075s}.hamburger--elastic.is-active .hamburger-inner::before{transition-delay:0s;opacity:0}.hamburger--elastic.is-active .hamburger-inner::after{transform:translate3d(0, -20px, 0) rotate(-270deg);transition-delay:0.075s}.hamburger--elastic-r .hamburger-inner{top:2px;transition-duration:0.275s;transition-timing-function:cubic-bezier(0.68, -0.55, 0.265, 1.55)}.hamburger--elastic-r .hamburger-inner::before{top:10px;transition:opacity 0.125s 0.275s ease}.hamburger--elastic-r .hamburger-inner::after{top:20px;transition:transform 0.275s cubic-bezier(0.68, -0.55, 0.265, 1.55)}.hamburger--elastic-r.is-active .hamburger-inner{transform:translate3d(0, 10px, 0) rotate(-135deg);transition-delay:0.075s}.hamburger--elastic-r.is-active .hamburger-inner::before{transition-delay:0s;opacity:0}.hamburger--elastic-r.is-active .hamburger-inner::after{transform:translate3d(0, -20px, 0) rotate(270deg);transition-delay:0.075s}.hamburger--emphatic{overflow:hidden}.hamburger--emphatic .hamburger-inner{transition:background-color 0.125s 0.175s ease-in}.hamburger--emphatic .hamburger-inner::before{left:0;transition:transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),top 0.05s 0.125s linear,left 0.125s 0.175s ease-in}.hamburger--emphatic .hamburger-inner::after{top:10px;right:0;transition:transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),top 0.05s 0.125s linear,right 0.125s 0.175s ease-in}.hamburger--emphatic.is-active .hamburger-inner{transition-delay:0s;transition-timing-function:ease-out;background-color:transparent}.hamburger--emphatic.is-active .hamburger-inner::before{left:-80px;top:-80px;transform:translate3d(80px, 80px, 0) rotate(45deg);transition:left 0.125s ease-out,top 0.05s 0.125s linear,transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1)}.hamburger--emphatic.is-active .hamburger-inner::after{right:-80px;top:-80px;transform:translate3d(-80px, 80px, 0) rotate(-45deg);transition:right 0.125s ease-out,top 0.05s 0.125s linear,transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1)}.hamburger--emphatic-r{overflow:hidden}.hamburger--emphatic-r .hamburger-inner{transition:background-color 0.125s 0.175s ease-in}.hamburger--emphatic-r .hamburger-inner::before{left:0;transition:transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),top 0.05s 0.125s linear,left 0.125s 0.175s ease-in}.hamburger--emphatic-r .hamburger-inner::after{top:10px;right:0;transition:transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),top 0.05s 0.125s linear,right 0.125s 0.175s ease-in}.hamburger--emphatic-r.is-active .hamburger-inner{transition-delay:0s;transition-timing-function:ease-out;background-color:transparent}.hamburger--emphatic-r.is-active .hamburger-inner::before{left:-80px;top:80px;transform:translate3d(80px, -80px, 0) rotate(-45deg);transition:left 0.125s ease-out,top 0.05s 0.125s linear,transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1)}.hamburger--emphatic-r.is-active .hamburger-inner::after{right:-80px;top:80px;transform:translate3d(-80px, -80px, 0) rotate(45deg);transition:right 0.125s ease-out,top 0.05s 0.125s linear,transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1)}.hamburger--minus .hamburger-inner::before,.hamburger--minus .hamburger-inner::after{transition:bottom 0.08s 0s ease-out, top 0.08s 0s ease-out, opacity 0s linear}.hamburger--minus.is-active .hamburger-inner::before,.hamburger--minus.is-active .hamburger-inner::after{opacity:0;transition:bottom 0.08s ease-out, top 0.08s ease-out, opacity 0s 0.08s linear}.hamburger--minus.is-active .hamburger-inner::before{top:0}.hamburger--minus.is-active .hamburger-inner::after{bottom:0}.hamburger--slider .hamburger-inner{top:2px}.hamburger--slider .hamburger-inner::before{top:10px;transition-property:transform, opacity;transition-timing-function:ease;transition-duration:0.15s}.hamburger--slider .hamburger-inner::after{top:20px}.hamburger--slider.is-active .hamburger-inner{transform:translate3d(0, 10px, 0) rotate(45deg)}.hamburger--slider.is-active .hamburger-inner::before{transform:rotate(-45deg) translate3d(-5.71429px, -6px, 0);opacity:0}.hamburger--slider.is-active .hamburger-inner::after{transform:translate3d(0, -20px, 0) rotate(-90deg)}.hamburger--slider-r .hamburger-inner{top:2px}.hamburger--slider-r .hamburger-inner::before{top:10px;transition-property:transform, opacity;transition-timing-function:ease;transition-duration:0.15s}.hamburger--slider-r .hamburger-inner::after{top:20px}.hamburger--slider-r.is-active .hamburger-inner{transform:translate3d(0, 10px, 0) rotate(-45deg)}.hamburger--slider-r.is-active .hamburger-inner::before{transform:rotate(45deg) translate3d(5.71429px, -6px, 0);opacity:0}.hamburger--slider-r.is-active .hamburger-inner::after{transform:translate3d(0, -20px, 0) rotate(90deg)}.hamburger--spin .hamburger-inner{transition-duration:0.22s;transition-timing-function:cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--spin .hamburger-inner::before{transition:top 0.1s 0.25s ease-in, opacity 0.1s ease-in}.hamburger--spin .hamburger-inner::after{transition:bottom 0.1s 0.25s ease-in,transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--spin.is-active .hamburger-inner{transform:rotate(225deg);transition-delay:0.12s;transition-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--spin.is-active .hamburger-inner::before{top:0;opacity:0;transition:top 0.1s ease-out, opacity 0.1s 0.12s ease-out}.hamburger--spin.is-active .hamburger-inner::after{bottom:0;transform:rotate(-90deg);transition:bottom 0.1s ease-out,transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--spin-r .hamburger-inner{transition-duration:0.22s;transition-timing-function:cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--spin-r .hamburger-inner::before{transition:top 0.1s 0.25s ease-in, opacity 0.1s ease-in}.hamburger--spin-r .hamburger-inner::after{transition:bottom 0.1s 0.25s ease-in,transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--spin-r.is-active .hamburger-inner{transform:rotate(-225deg);transition-delay:0.12s;transition-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--spin-r.is-active .hamburger-inner::before{top:0;opacity:0;transition:top 0.1s ease-out, opacity 0.1s 0.12s ease-out}.hamburger--spin-r.is-active .hamburger-inner::after{bottom:0;transform:rotate(90deg);transition:bottom 0.1s ease-out,transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--spring .hamburger-inner{top:2px;transition:background-color 0s 0.13s linear}.hamburger--spring .hamburger-inner::before{top:10px;transition:top 0.1s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--spring .hamburger-inner::after{top:20px;transition:top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--spring.is-active .hamburger-inner{transition-delay:0.22s;background-color:transparent}.hamburger--spring.is-active .hamburger-inner::before{top:0;transition:top 0.1s 0.15s cubic-bezier(0.33333, 0, 0.66667, 0.33333),transform 0.13s 0.22s cubic-bezier(0.215, 0.61, 0.355, 1);transform:translate3d(0, 10px, 0) rotate(45deg)}.hamburger--spring.is-active .hamburger-inner::after{top:0;transition:top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),transform 0.13s 0.22s cubic-bezier(0.215, 0.61, 0.355, 1);transform:translate3d(0, 10px, 0) rotate(-45deg)}.hamburger--spring-r .hamburger-inner{top:auto;bottom:0;transition-duration:0.13s;transition-delay:0s;transition-timing-function:cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--spring-r .hamburger-inner::after{top:-20px;transition:top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),opacity 0s linear}.hamburger--spring-r .hamburger-inner::before{transition:top 0.1s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--spring-r.is-active .hamburger-inner{transform:translate3d(0, -10px, 0) rotate(-45deg);transition-delay:0.22s;transition-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--spring-r.is-active .hamburger-inner::after{top:0;opacity:0;transition:top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),opacity 0s 0.22s linear}.hamburger--spring-r.is-active .hamburger-inner::before{top:0;transform:rotate(90deg);transition:top 0.1s 0.15s cubic-bezier(0.33333, 0, 0.66667, 0.33333),transform 0.13s 0.22s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--stand .hamburger-inner{transition:transform 0.075s 0.15s cubic-bezier(0.55, 0.055, 0.675, 0.19),background-color 0s 0.075s linear}.hamburger--stand .hamburger-inner::before{transition:top 0.075s 0.075s ease-in,transform 0.075s 0s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--stand .hamburger-inner::after{transition:bottom 0.075s 0.075s ease-in,transform 0.075s 0s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--stand.is-active .hamburger-inner{transform:rotate(90deg);background-color:transparent;transition:transform 0.075s 0s cubic-bezier(0.215, 0.61, 0.355, 1),background-color 0s 0.15s linear}.hamburger--stand.is-active .hamburger-inner::before{top:0;transform:rotate(-45deg);transition:top 0.075s 0.1s ease-out,transform 0.075s 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--stand.is-active .hamburger-inner::after{bottom:0;transform:rotate(45deg);transition:bottom 0.075s 0.1s ease-out,transform 0.075s 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--stand-r .hamburger-inner{transition:transform 0.075s 0.15s cubic-bezier(0.55, 0.055, 0.675, 0.19),background-color 0s 0.075s linear}.hamburger--stand-r .hamburger-inner::before{transition:top 0.075s 0.075s ease-in,transform 0.075s 0s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--stand-r .hamburger-inner::after{transition:bottom 0.075s 0.075s ease-in,transform 0.075s 0s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--stand-r.is-active .hamburger-inner{transform:rotate(-90deg);background-color:transparent;transition:transform 0.075s 0s cubic-bezier(0.215, 0.61, 0.355, 1),background-color 0s 0.15s linear}.hamburger--stand-r.is-active .hamburger-inner::before{top:0;transform:rotate(-45deg);transition:top 0.075s 0.1s ease-out,transform 0.075s 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--stand-r.is-active .hamburger-inner::after{bottom:0;transform:rotate(45deg);transition:bottom 0.075s 0.1s ease-out,transform 0.075s 0.15s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--squeeze .hamburger-inner{transition-duration:0.075s;transition-timing-function:cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--squeeze .hamburger-inner::before{transition:top 0.075s 0.12s ease, opacity 0.075s ease}.hamburger--squeeze .hamburger-inner::after{transition:bottom 0.075s 0.12s ease,transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19)}.hamburger--squeeze.is-active .hamburger-inner{transform:rotate(45deg);transition-delay:0.12s;transition-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--squeeze.is-active .hamburger-inner::before{top:0;opacity:0;transition:top 0.075s ease, opacity 0.075s 0.12s ease}.hamburger--squeeze.is-active .hamburger-inner::after{bottom:0;transform:rotate(-90deg);transition:bottom 0.075s ease,transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1)}.hamburger--vortex .hamburger-inner{transition-duration:0.2s;transition-timing-function:cubic-bezier(0.19, 1, 0.22, 1)}.hamburger--vortex .hamburger-inner::before,.hamburger--vortex .hamburger-inner::after{transition-duration:0s;transition-delay:0.1s;transition-timing-function:linear}.hamburger--vortex .hamburger-inner::before{transition-property:top, opacity}.hamburger--vortex .hamburger-inner::after{transition-property:bottom, transform}.hamburger--vortex.is-active .hamburger-inner{transform:rotate(765deg);transition-timing-function:cubic-bezier(0.19, 1, 0.22, 1)}.hamburger--vortex.is-active .hamburger-inner::before,.hamburger--vortex.is-active .hamburger-inner::after{transition-delay:0s}.hamburger--vortex.is-active .hamburger-inner::before{top:0;opacity:0}.hamburger--vortex.is-active .hamburger-inner::after{bottom:0;transform:rotate(90deg)}.hamburger--vortex-r .hamburger-inner{transition-duration:0.2s;transition-timing-function:cubic-bezier(0.19, 1, 0.22, 1)}.hamburger--vortex-r .hamburger-inner::before,.hamburger--vortex-r .hamburger-inner::after{transition-duration:0s;transition-delay:0.1s;transition-timing-function:linear}.hamburger--vortex-r .hamburger-inner::before{transition-property:top, opacity}.hamburger--vortex-r .hamburger-inner::after{transition-property:bottom, transform}.hamburger--vortex-r.is-active .hamburger-inner{transform:rotate(-765deg);transition-timing-function:cubic-bezier(0.19, 1, 0.22, 1)}.hamburger--vortex-r.is-active .hamburger-inner::before,.hamburger--vortex-r.is-active .hamburger-inner::after{transition-delay:0s}.hamburger--vortex-r.is-active .hamburger-inner::before{top:0;opacity:0}.hamburger--vortex-r.is-active .hamburger-inner::after{bottom:0;transform:rotate(-90deg)}\n      .menu-container{width:250px;height:100%;position:fixed;background:#fff;top:60px;bottom:0;left:0;transition:all .3s cubic-bezier(0.215, 0.61, 0.355, 1);font-family:'Arial',sans-serif;overflow:auto;height:calc(100% - 60px);z-index:9999999;box-shadow:0px 5px 2px #ccc}.menu-container .show-menu{left:0}.menu-container.hide-menu{left:-250px}.menu-open{margin-left:250px !important}.cuppa-menu ul{list-style:none;padding:0px}.cuppa-menu ul>li{cursor:pointer}.sub-menu{overflow:hidden}.sub-menu>li>a{padding-left:50px !important}.cuppa-menu ul>li>a{display:block;padding:15px 30px;background:#fff;text-decoration:none;border-bottom:1px solid #ccc;transition:all .3s linear}.cuppa-menu ul>li>a:hover{background:#007bff;color:#fff}.cuppa-menu ul>li>a.active{background:#007bff;color:#fff}.cuppa-menu ul>li>a>i{font-size:24px;float:right;margin-top:-2px;pointer-events:none}.cuppa-menu-overlay{position:fixed;background:#000;top:0;left:0;right:0;bottom:0;display:none;transition:all 1s linear}.show-overlay{display:block}.hide-overlay{display:none}\n    "],
                    animations: [
                        trigger('toggleMenu', [
                            state('show', style({ height: '*' })),
                            state('hide', style({ height: 0 })),
                            transition('void => *', [
                                style({ height: 0, overflow: 'hidden' })
                            ]),
                            transition('* => hide', [
                                style({ height: '*' }),
                                animate(250, style({ height: 0 }))
                            ]),
                            transition('hide => show', [
                                style({ height: 0 }),
                                animate(250, style({ height: '*' }))
                            ])
                        ]),
                        trigger('toggleArrow', [
                            state('right', style({ transform: 'rotate(0)' })),
                            state('down', style({ transform: 'rotate(90deg)' })),
                            transition('right <=> down', animate('100ms ease-in'))
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    SlideMenu.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: DomSanitizer, },
    ]; };
    SlideMenu.propDecorators = {
        'menulist': [{ type: Input },],
        'config': [{ type: Input },],
        'open': [{ type: Output, args: ['open',] },],
        'close': [{ type: Output, args: ['close',] },],
        'itemSelect': [{ type: Output, args: ['onItemSelect',] },],
    };
    return SlideMenu;
}());
export { SlideMenu };
var SlideMenuModule = /** @class */ (function () {
    function SlideMenuModule() {
    }
    SlideMenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, BrowserAnimationsModule],
                    declarations: [SlideMenu, ClickOutsideDirective],
                    exports: [SlideMenu, ClickOutsideDirective, BrowserAnimationsModule]
                },] },
    ];
    /** @nocollapse */
    SlideMenuModule.ctorParameters = function () { return []; };
    return SlideMenuModule;
}());
export { SlideMenuModule };
//# sourceMappingURL=slideMenu.js.map