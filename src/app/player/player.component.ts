import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Song } from 'src/utils/types';
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @Input() song!: Song;
  @Output() onAudioUpdate = new EventEmitter();
  @Output() goNext = new EventEmitter<number>();
  @Output() goPrev = new EventEmitter<number>();
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

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onAudioTimeupdate(event: any) {
    this.onAudioUpdate.emit(event);
    this.starttime = this.getTimeStamp(this.audio.nativeElement.currentTime);
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
