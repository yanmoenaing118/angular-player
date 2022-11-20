import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SongsListService {
  BASE_URL = `http://localhost:3000/songs`;

  constructor(private http: HttpClient) {}

  getSongsList() {
    return this.http.get(this.BASE_URL);
  }

  getSongById(id: number) {
    return this.http.get(`${this.BASE_URL}/${id}`)
  }
}
