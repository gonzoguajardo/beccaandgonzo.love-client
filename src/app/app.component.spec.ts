import { async, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { SlideMenuModule } from './cuppa-ng2-slidemenu';
import { HeaderService } from './header/header.service';
import { FooterComponent } from './footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				HeaderModule,
				SlideMenuModule,
				RouterTestingModule,
			],
			declarations: [
				AppComponent,
				FooterComponent
			],
			providers: [
				HeaderService,
			]
		}).compileComponents();
	}));
	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
	xit(`should have as title 'app'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('app');
	}));
	xit('should render title in a h1 tag', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
	}));
});
