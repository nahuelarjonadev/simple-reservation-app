import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

import { MakeReservationService } from '../make-reservation.service';

/** Component that renders a calendar from which the user picks a date for the reservation
 * Dates will be enabled or disabled based on if they have any available time slots to reserve
 */
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
    // Reset date selection if the room changes
    this.makeReservationService.getOnRoomSelectedListener().subscribe(() => {
      const today = new Date();
      this.makeReservationService.setSelectedDate(today);
      this.calendar.selected = today;
      this.calendar.updateTodaysDate();
    });

    // Update the date selected on the calendar view
    this.makeReservationService.getOnDateSelectedListener().subscribe((date: Date) => {
      this.calendar.selected = date;
    });
  }

  /**
   * Saves the date selected on the calendar on the service
   * @param date can be null before the user has clicked on a day
   */
  setSelectedDate(date: Date | null) {
    if (!date) return;

    this.makeReservationService.setSelectedDate(date);
  }

  /**
   * Used as a calendar filter
   * @param d the day in the calendar
   * @returns true if the day has at least one time slot available
   */
  getAvailableDatesForRoom = (d: Date | null): boolean => {
    const date = d || new Date();
    const timeSlots = this.makeReservationService.getTimeSlots(this.makeReservationService.getSelectedRoom(), date);

    return timeSlots.length > 0;
  };
}
