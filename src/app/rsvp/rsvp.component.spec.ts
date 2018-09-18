import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpComponent } from './rsvp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderService } from '../header/header.service';
import { PlaylistModule } from '../playlist/playlist.module';
import { RsvpService } from './rsvp.service';

describe('RsvpComponent', () => {
	let component: RsvpComponent;
	let fixture: ComponentFixture<RsvpComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule, ReactiveFormsModule, PlaylistModule
			],
			declarations: [RsvpComponent],
			providers: [
				HeaderService,
				RsvpService
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RsvpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
