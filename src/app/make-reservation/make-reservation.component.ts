import { Component, OnInit } from '@angular/core';
import { MakeReservationService } from './make-reservation.service';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.sass'],
})
export class MakeReservationComponent implements OnInit {
  constructor(private makeReservationService: MakeReservationService) {}

  canMakeReservation(): boolean {
    return this.makeReservationService.isReadyToMakeReservation();
  }

  makeReservation() {
    this.makeReservationService.saveReservation();
  }

  ngOnInit(): void {
    return;
  }
}
