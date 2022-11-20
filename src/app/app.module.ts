import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayListComponent } from './play-list/play-list.component';
import { PlayerComponent } from './player/player.component';
import { SongsListService } from './services/songs-list.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayListComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    SongsListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
