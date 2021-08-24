import { Injectable } from '@angular/core';
import { Reservation, ReservationDate, RoomDates } from './reservation.model';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MakeReservationService {
  constructor() {}

  private onRoomSelected = new Subject<string>();
  private onDateSelected = new Subject<Date>();
  private onTimeSlotSelected = new Subject<string>();

  private availableRooms: string[] = ['room1', 'room2', 'room3'];
  private selectedRoom: string = '';
  private selectedDate: Date = new Date();
  private selectedTimeSlot: string = '';
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

  private savedReservations: Reservation[] = [];

  getOnRoomSelectedListener() {
    return this.onRoomSelected.asObservable();
  }

  getOnDateSelectedListener() {
    return this.onDateSelected.asObservable();
  }

  getOnTimeSlotSelectedListener() {
    return this.onTimeSlotSelected.asObservable();
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

  getSelectedTimeSlot(): string {
    return this.selectedTimeSlot;
  }

  setSelectedTimeSlot(timeSlot: string) {
    if (this.selectedTimeSlot === timeSlot) return;

    this.selectedTimeSlot = timeSlot;
    this.onTimeSlotSelected.next(this.selectedTimeSlot);
  }

  generateBaseTimeSlots = (() => {
    const timeSlots: string[] = [];

    let lambda = () => {
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

  private makeReservationDate(date: Date): ReservationDate {
    return {
      year: this.selectedDate.getFullYear(),
      month: this.selectedDate.getMonth() + 1,
      day: this.selectedDate.getDate(),
    };
  }

  private fromReservationDateToDate(reservationDate: ReservationDate): Date {
    const date = new Date();
    date.setFullYear(reservationDate.year);
    date.setMonth(reservationDate.month - 1);
    date.setDate(reservationDate.day);

    return date;
  }

  private validateReservation(reservation: Reservation): boolean {
    const validRoom: boolean = this.availableRooms.includes(reservation.room);
    if (!validRoom) return false;

    const date = this.fromReservationDateToDate(reservation.date);
    const timeSlots: string[] = this.getTimeSlots(reservation.room, date);
    const validTimeSlot = timeSlots.includes(reservation.timeSlot);

    return validTimeSlot;
  }

  saveReservation() {
    const reservationDate: ReservationDate = this.makeReservationDate(this.selectedDate);
    const reservation: Reservation = {
      room: this.selectedRoom,
      date: reservationDate,
      timeSlot: this.selectedTimeSlot,
    };

    const isValid = this.validateReservation(reservation);
    if (isValid) {
      this.savedReservations.push(reservation);
      const timeSlots =
        this.availableRoomDates[reservation.room][reservation.date.year][reservation.date.month][reservation.date.day];
      const timeSlotIndex = timeSlots.indexOf(reservation.timeSlot);
      timeSlots.splice(timeSlotIndex, 1);
      console.log('Reservation Succeeded!');
      console.log(this.savedReservations);

      this.setSelectedRoom('');
    } else {
      console.log('ERROR: reservation failed validation');
    }
  }
}
