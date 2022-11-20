import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Song } from 'src/utils/types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SongsListService } from '../services/songs-list.service';


const songs: Array<Song> = [
  {
    id: 1,
    title: 'Pian Pian',
    drama: 'Eternal Love of Dream',
    singer: 'Dilraba Dilmurat & Silence Wang',
    src: 'https://myplaylist.vercel.app/static/media/elod.d2eebfc8.mp3',
    poster: 'https://myplaylist.vercel.app/static/media/elod.852037c1.png',
    eng_subtitle:
      'https://myplaylist.vercel.app/static/media/elod.defe39dc.vtt',
  },
  {
    id: 2,
    title: 'Only For You',
    drama: "General's Lady",
    singer: 'Ye Xuan Qing',
    src: 'https://myplaylist.vercel.app/static/media/for_one_person.20cab8c7.mp3',
    poster:
      'https://myplaylist.vercel.app/static/media/general_lady.b2cdd923.png',
    eng_subtitle:
      'https://myplaylist.vercel.app/static/media/for_one_person.5ecb8399.vtt',
  },
  {
    id: 4,
    title: 'Moonlight Drawn By Cloud',
    drama: 'Love In The Moonlight',
    singer: 'Someone',
    src: 'https://myplaylist.vercel.app/static/media/moonlight_drawn_by_clouds.5bc5fbfd.mp3',
    poster:
      'https://myplaylist.vercel.app/static/media/moonlight.a6b27b7c.jpeg',
    eng_subtitle:
      'https://myplaylist.vercel.app/static/media/moonlight_drawn_by_clouds.50fea06d.vtt',
  },
  {
    id: 5,
    title: 'Here I am again',
    drama: 'Crash Landing On You',
    singer: 'Davichi',
    src: 'https://myplaylist.vercel.app/static/media/here_i_am_again.1e8e27f3.mp3',
    poster: 'https://zadlan.com/wp-content/uploads/2022/02/768aa2e6-643e-11ea-8e9f-2d196083a37c_image_hires_171957.jpg',
    eng_subtitle:
      'https://myplaylist.vercel.app/static/media/here_i_am_again.1c5d3248.vtt',
  },
  {
    id: 7,
    title: 'This Love',
    drama: 'Descendants of The Sun',
    singer: 'Davichi',
    src: 'https://myplaylist.vercel.app/static/media/this_love.9977ade1.mp3',
    poster: 'https://myplaylist.vercel.app/static/media/dst.6ac8d29d.jpeg',
    eng_subtitle:
      'https://myplaylist.vercel.app/static/media/this_love.99d53d45.vtt',
  },
  {
    id: 6,
    title: 'Done For Me',
    drama: 'Hotel De Luna',
    singer: 'Punch',
    src: 'https://myplaylist.vercel.app/static/media/done_for_me.2b93e9d0.mp3',
    poster:
      'https://myplaylist.vercel.app/static/media/hotel_deluna.5d28b181.jpg',
    eng_subtitle:
      'https://myplaylist.vercel.app/static/media/done_for_me.2d83e900.vtt',
  },
  {
    id: 3,
    title: 'Coloured Glass',
    drama: 'Love and Redemption',
    singer: 'Liu Yu Ning',
    src: 'https://myplaylist.vercel.app/static/media/coloured_glass.1017183e.mp3',
    poster:
      'https://myplaylist.vercel.app/static/media/coloured_glass.d83b31cb.jpeg',
    eng_subtitle:
      'https://myplaylist.vercel.app/static/media/coloured_glass.690e3355.vtt',
  },
];

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css'],
})
export class PlayListComponent implements OnInit {

  @Output() emitSelectedSong = new EventEmitter<Song>();
  @Output() closePlayList = new EventEmitter<void>();
  songs: any;
  faXmark = faXmark;

  constructor(private songsService: SongsListService) {
    this.songs = songs;
  }

  ngOnInit(): void {
    this.songsService.getSongsList()
    .subscribe(res => {
      this.songs = res;
    })
  }

  selectSong(song: Song) {
    this.emitSelectedSong.emit(song);
  }

  closePlaylist(){
    this.closePlayList.emit();
  }
}
