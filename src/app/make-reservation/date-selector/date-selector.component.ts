import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

import { MakeReservationService } from '../make-reservation.service';
import { RoomDates } from '../room-dates.model';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.sass'],
})
export class DateSelectorComponent implements OnInit {
  constructor(private makeReservationService: MakeReservationService) {}

  private currentRoomDates: RoomDates = {};
  public selectedDate!: Date | null;

  @ViewChild(MatCalendar)
  calendar!: MatCalendar<Date>;

  ngOnInit(): void {
    const selectedRoom = this.makeReservationService.getSelectedRoom();
    this.currentRoomDates = this.makeReservationService.getAvailableDatesForRoom(selectedRoom);

    this.makeReservationService.getOnRoomSelectedListener().subscribe((room: string) => {
      this.currentRoomDates = this.makeReservationService.getAvailableDatesForRoom(room);
      console.log(this.currentRoomDates);
      this.calendar.updateTodaysDate();
    });
  }

  getAvailableDatesForRoom = (d: Date | null): boolean => {
    const date = d || new Date();
    const year = this.currentRoomDates[date.getFullYear()];
    const month = year ? year[date.getMonth() + 1] : false;
    const day = month ? month[date.getDate()] : false;

    return day !== false && day !== undefined;
  };
}
