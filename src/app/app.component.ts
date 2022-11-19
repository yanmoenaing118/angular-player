import { Component } from '@angular/core';
import { Song } from 'src/utils/types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
}
