import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

import { MakeReservationService } from '../make-reservation.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.sass'],
})
export class DateSelectorComponent implements OnInit {
  constructor(private makeReservationService: MakeReservationService) {}

  @ViewChild(MatCalendar)
  calendar!: MatCalendar<Date>;

  ngOnInit(): void {
    this.makeReservationService.getOnRoomSelectedListener().subscribe(() => {
      this.calendar.updateTodaysDate();
    });

    this.makeReservationService.getOnDateSelectedListener().subscribe((date: Date) => {
      this.calendar.selected = date;
    });
  }

  setSelectedDate(date: Date | null) {
    if (!date) return;

    this.makeReservationService.setSelectedDate(date);
  }

  getAvailableDatesForRoom = (d: Date | null): boolean => {
    const date = d || new Date();
    const timeSlots = this.makeReservationService.getTimeSlots(this.makeReservationService.getSelectedRoom(), date);

    return timeSlots.length > 0;
  };
}
