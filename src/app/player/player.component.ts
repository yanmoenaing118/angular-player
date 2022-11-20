import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Song } from 'src/utils/types';
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
} from '@fortawesome/free-solid-svg-icons';
import { SongsListService } from '../services/songs-list.service';
import { ActivatedRoute, RouterEvent, Event, Router } from '@angular/router';
import { filter } from 'rxjs';
import { fetchSubtitle, createSubtitle } from 'src/utils/subtitle';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  song: any = null;
  @Output() onAudioUpdate = new EventEmitter();
  @ViewChild('audio') audio!: ElementRef<HTMLAudioElement>;

  /** ICONS */
  faPlay = faPlay;
  faPause = faPause;
  faBackward = faBackward;
  faForward = faForward;

  /** Player States */
  starttime!: string;
  endtime!: string;
  paused: boolean = true;
  played: boolean = false;
  subtitleArray: any = [];
  subtitleText: string = '';

  constructor(
    private songsService: SongsListService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getSong();
  }

  getSong() {
    const routeParams = this.route.snapshot.paramMap;
    const songId = Number(routeParams.get('id'));
    this.songsService.getSongById(songId).subscribe((res) => {
      this.song = res;
      this.createSubtitleArray();
    });
  }

  onAudioTimeupdate(event: any) {
    // this.onAudioUpdate.emit(event);
    this.starttime = this.getTimeStamp(this.audio.nativeElement.currentTime);
    this.subtitleArray.forEach((el: any, idx: number) => {
      if (
        event.target.currentTime * 1000 >= el.start &&
        event.target.currentTime * 1000 <= el.end
      ) {
        this.subtitleText = this.subtitleArray[idx].part;
      }
    });
  }

  createSubtitleArray(): void {
    
    fetchSubtitle(this.song.eng_subtitle)
      .then((subtitleText) => createSubtitle(subtitleText))
      .then((sub) => {
        this.subtitleArray = sub;
      });
  }

  onAudioMetadataLoaded(event: any) {
    const audio = this.audio.nativeElement;
    this.starttime = '00:00';
    this.endtime = this.getTimeStamp(audio.duration);
  }

  

  onPlay(event: any) {
    this.play();
  }

  onPause(event: any) {
    this.pause();
  }

  play() {
    this.audio.nativeElement.play();
    this.paused = false;
    this.played = true;
  }

  pause() {
    this.audio.nativeElement.pause();
    this.paused = true;
    this.played = false;
  }

  togglePlayPause() {
    if (this.audio.nativeElement.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  getTimeStamp(time: number) {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);

    let minuteString;
    let secondString;

    if (minute >= 10) {
      minuteString = `${minute}`;
    } else {
      minuteString = `0${minute}`;
    }

    if (second >= 10) {
      secondString = `${second}`;
    } else {
      secondString = `0${second}`;
    }

    return `${minuteString}:${secondString}`;
  }
}
