import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { HeaderService } from '../header/header.service';

describe('PhotosComponent', () => {
	let component: PhotosComponent;
	let fixture: ComponentFixture<PhotosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [Angular2ImageGalleryModule],
			declarations: [PhotosComponent],
			providers: [HeaderService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PhotosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
