import { Component, OnInit } from '@angular/core';
import { MakeReservationService } from '../make-reservation.service';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.sass'],
})
export class TimeSelectorComponent implements OnInit {
  constructor(private makeReservationService: MakeReservationService) {}

  getTimeSlots(): string[] {
    return this.makeReservationService.generateBaseTimeSlots();
  }

  // cache this locally for performance
  private availableTimeSlots: string[] = [];

  isTimeAvailable(time: string): boolean {
    return this.availableTimeSlots.includes(time);
  }

  ngOnInit(): void {
    this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();

    this.makeReservationService.getOnRoomSelectedListener().subscribe(() => {
      this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();
    });

    this.makeReservationService.getOnDateSelectedListener().subscribe(() => {
      this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();
    });
  }
}
