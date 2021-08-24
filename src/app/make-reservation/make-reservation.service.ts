import { Injectable } from '@angular/core';
import { RoomDates } from './room-dates.model';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MakeReservationService {
  constructor() {}

  private onRoomSelected = new Subject<string>();
  private onDateSelected = new Subject<Date>();

  private availableRooms: string[] = ['room1', 'room2', 'room3'];
  private selectedRoom: string = '';
  private selectedDate: Date = new Date();
  private availableRoomDates: { [Room: string]: RoomDates } = {
    room1: {
      2021: {
        8: {
          25: ['10:30', '11:00', '12:00', '13:30'],
          26: ['10:00', '10:30', '11:00', '12:30'],
          29: ['11:00'],
        },
        9: {
          1: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
          2: ['11:00', '12:30'],
        },
      },
    },
    room2: {
      2021: {
        8: {
          25: ['10:30', '11:00', '12:00', '13:30'],
          26: ['10:00', '10:30', '11:00', '12:30'],
          29: ['11:00'],
        },
      },
    },
    room3: {},
  };

  getOnRoomSelectedListener() {
    return this.onRoomSelected.asObservable();
  }

  getOnDateSelectedListener() {
    return this.onDateSelected.asObservable();
  }

  getAvailableRooms(): string[] {
    return [...this.availableRooms];
  }

  getSelectedRoom(): string {
    return this.selectedRoom;
  }

  setSelectedRoom(room: string) {
    if (this.selectedRoom === room) return;

    this.selectedRoom = room;
    this.onRoomSelected.next(this.selectedRoom);
  }

  getSelectedDate(): Date {
    return this.selectedDate;
  }

  setSelectedDate(date: Date) {
    if (
      this.selectedDate.getFullYear() === date.getFullYear() &&
      this.selectedDate.getMonth() === date.getMonth() &&
      this.selectedDate.getDate() === date.getDate()
    ) {
      return;
    }

    this.selectedDate = date;
    this.onDateSelected.next(this.selectedDate);
  }

  generateBaseTimeSlots = (() => {
    const timeSlots: string[] = [];

    let lambda = () => {
      console.log('run!');
      if (timeSlots.length > 0) return timeSlots;

      const generateBetweenTimes = (startTime: moment.Moment, endTime: moment.Moment) => {
        while (startTime <= endTime) {
          const newTime: string = moment(startTime).format('HH:mm');
          timeSlots.push(newTime);
          startTime.add(30, 'minutes');
        }
      };

      let startTime: moment.Moment = moment().utc().set({ hour: 9, minute: 0 });
      let endTime: moment.Moment = moment().utc().set({ hour: 12, minute: 30 });
      generateBetweenTimes(startTime, endTime);

      startTime.set({ hour: 16, minute: 0 });
      endTime.set({ hour: 19, minute: 30 });
      generateBetweenTimes(startTime, endTime);

      console.log('generated');

      return timeSlots;
    };

    return lambda;
  })();

  getTimeSlotsForCurrentSelection(): string[] {
    return this.getTimeSlots(this.selectedRoom, this.selectedDate);
  }

  getTimeSlots(room: string, date: Date): string[] {
    const roomDates = this.availableRoomDates[room];
    if (roomDates === undefined) return [];

    const year = roomDates[date.getFullYear()];
    const month = year ? year[date.getMonth() + 1] : false;
    const dayTimeSlots = month ? month[date.getDate()] : [];

    return dayTimeSlots || [];
  }

  getAvailableDatesForRoom = (room: string): RoomDates => {
    return this.availableRoomDates[room] ? JSON.parse(JSON.stringify(this.availableRoomDates[room])) : {};
  };
}
