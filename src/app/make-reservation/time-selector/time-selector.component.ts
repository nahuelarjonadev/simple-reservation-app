import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MakeReservationService } from '../make-reservation.service';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.sass'],
})
export class TimeSelectorComponent implements OnInit {
  constructor(private makeReservationService: MakeReservationService) {}

  public timeSlots: string[] = [];
  private availableTimeSlots: string[] = [];

  generateTimeSlots() {
    const generateBetweenTimes = (startTime: moment.Moment, endTime: moment.Moment) => {
      while (startTime <= endTime) {
        const newTime: string = moment(startTime).format('HH:mm');
        this.timeSlots.push(newTime);
        startTime.add(30, 'minutes');
      }
    };

    let startTime: moment.Moment = moment().utc().set({ hour: 9, minute: 0 });
    let endTime: moment.Moment = moment().utc().set({ hour: 12, minute: 30 });
    generateBetweenTimes(startTime, endTime);

    startTime.set({ hour: 16, minute: 0 });
    endTime.set({ hour: 19, minute: 30 });
    generateBetweenTimes(startTime, endTime);
  }

  isTimeAvailable(time: string): boolean {
    return this.availableTimeSlots.includes(time);
  }

  ngOnInit(): void {
    this.generateTimeSlots();
    this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();

    this.makeReservationService.getOnRoomSelectedListener().subscribe(() => {
      this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();
    });

    this.makeReservationService.getOnDateSelectedListener().subscribe(() => {
      this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();
    });
  }
}
