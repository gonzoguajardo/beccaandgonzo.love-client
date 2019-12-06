import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

	@ViewChild('videoPlayer', {static: true}) videoPlayer: ElementRef;
	playing = false;

	constructor() {
	}

	ngOnInit() {
	}

	toggleVideo() {
		if (this.playing) {
			this.videoPlayer.nativeElement.play();
		} else {
			this.videoPlayer.nativeElement.pause();
		}
		this.playing = !this.playing;
	}

}
