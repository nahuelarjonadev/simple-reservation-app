import { Component, OnInit } from '@angular/core';
import { MakeReservationService } from './make-reservation.service';

/**
 * The root component for making reservations
 * It contains all necessary selectors and the Make Reservation button
 */
@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.sass'],
})
export class MakeReservationComponent implements OnInit {
  constructor(private makeReservationService: MakeReservationService) {}

  /**
   * Used to enable or disable the Make Reservation button
   * @returns true if all selected reservation members are valid
   */
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
