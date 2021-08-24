import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.sass'],
})
export class TimeSelectorComponent implements OnInit {
  constructor() {}

  public timeSlots: string[] = [];

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

  ngOnInit(): void {
    this.generateTimeSlots();
  }
}
