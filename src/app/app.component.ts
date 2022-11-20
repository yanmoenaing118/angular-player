import { Component, OnInit } from '@angular/core';
import { fetchSubtitle, createSubtitle } from 'src/utils/subtitle';
import { Song } from 'src/utils/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-player';

  song: Song = {
    id: 1,
    title: 'Parting With Love',
    drama: 'Love Between Fairy and Devil',
    singer: 'Feay',
    src: '../assets/mp3/Parting-with-Love.mp3',
    poster: '../assets/poster/Parting-with-Love.jpg',
    eng_subtitle: '../assets/vtt/Parting-with-Love.vtt',
  };

  subtitleArray!: any;
  subtitleText: string = '';
  showPlaylist: boolean = false;

  ngOnInit(): void {
    this.createSubtitleArray();
  }

  selectSong(song: Song) {
    this.subtitleText = "";
    this.song = song;
    this.createSubtitleArray();
  }

  createSubtitleArray(): void {
    
    fetchSubtitle(this.song.eng_subtitle)
      .then((subtitleText) => createSubtitle(subtitleText))
      .then((sub) => {
        this.subtitleArray = sub;
      });
  }

  onAudioTimeupdate(event: any) {
    this.subtitleArray.forEach((el: any, idx: number) => {
      if (
        event.target.currentTime * 1000 >= el.start &&
        event.target.currentTime * 1000 <= el.end
      ) {
        this.subtitleText = this.subtitleArray[idx].part;
      }
    });
  }

  closePlaylist(): void {
    this.showPlaylist = false;
  }

  togglePlaylist(): void {
    this.showPlaylist = !this.showPlaylist;
  }
}
