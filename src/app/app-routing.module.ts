import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';

const routes: Routes = [{ path: '', component: MakeReservationComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
