import { Component, OnInit } from '@angular/core';
import { fetchSubtitle, createSubtitle } from 'src/utils/subtitle';
import { Song } from 'src/utils/types';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'angular-player';

  faBars = faBars;

  subtitleArray!: any;
  subtitleText: string = '';
  showPlaylist: boolean = false;


  
  closePlaylist(): void {
    this.showPlaylist = false;
  }

  togglePlaylist(): void {
    this.showPlaylist = !this.showPlaylist;
  }
}
