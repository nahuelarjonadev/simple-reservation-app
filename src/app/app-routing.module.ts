import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomSelectorComponent } from './make-reservation/room-selector/room-selector.component';

const routes: Routes = [{ path: '', component: RoomSelectorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
