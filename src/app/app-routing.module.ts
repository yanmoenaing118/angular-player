import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'play/0',
    pathMatch: "full"
  },
  {
    path: 'play/:id',
    component: PlayerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
