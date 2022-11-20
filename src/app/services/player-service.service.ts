import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SongsListService } from './songs-list.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerServiceService  {
  song: any;
  constructor(private songsService: SongsListService, private router: Router) {}

  
}
