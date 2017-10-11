import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Item } from './item';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styles: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

    items: Item[];
    audio = new Audio();
    paused = true;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get('http://localhost:8080/guajardo-wedding-web/api/playlist/').subscribe(data => {
            this.items = data['items'];
        });
    }

    playSample(source) {
        if (this.paused) {
            this.audio.src = source;
            this.audio.load();
            this.audio.play();
            this.paused = false;
        } else {
            this.audio.pause();
            this.paused = true;
        }

    }

}
