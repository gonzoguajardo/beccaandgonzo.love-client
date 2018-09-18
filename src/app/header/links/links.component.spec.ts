import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LinksComponent } from './links.component';
import { SlideMenuModule } from '../../cuppa-ng2-slidemenu';
import { HeaderComponent } from '../header.component';
import { HeaderService } from '../header.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LinksComponent', () => {
	let component: LinksComponent;
	let fixture: ComponentFixture<LinksComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SlideMenuModule,
				RouterTestingModule
			],
			declarations: [
				HeaderComponent,
				LinksComponent
			],
			providers: [HeaderService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LinksComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
