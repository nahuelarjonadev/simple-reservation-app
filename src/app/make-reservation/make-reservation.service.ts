import { Injectable } from '@angular/core';
import { Reservation, ReservationDate, RoomDates } from './reservation.model';
import { Subject } from 'rxjs';
import * as moment from 'moment';

/**
 * Main service for making reservations
 * In a real app this service would talk to the server using observables and what not
 * For the sake of this demo, I've kept a fake private state here instead
 */
@Injectable({
  providedIn: 'root',
})
export class MakeReservationService {
  constructor() {}

  private onRoomSelected = new Subject<string>();
  private onDateSelected = new Subject<Date>();
  private onTimeSlotSelected = new Subject<string>();

  /** Rooms the user can choose from */
  private availableRooms: string[] = ['room1', 'room2', 'room3'];

  private selectedRoom: string = '';
  private selectedDate: Date = new Date();
  private selectedTimeSlot: string = '';

  /** Fake data to simulate what the server would return when asked about all available room slots */
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

  /** Fake state used to store successful reservations. Reservation should have an ID, but I didn't ge to implement it */
  private savedReservations: Reservation[] = [];

  // methods to return Subjects as passive observables
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

  /**
   * Won't do anything if the same room is already selected or if the room is invalid
   * @param room can be '' to signify deselect
   */
  setSelectedRoom(room: string) {
    if (this.selectedRoom === room) return;
    if (room !== '' && !this.availableRooms.includes(room)) return;

    this.selectedRoom = room;
    this.onRoomSelected.next(this.selectedRoom);
  }

  getSelectedDate(): Date {
    return this.selectedDate;
  }

  /**
   * Won't do anything if the new date is the same already selected
   * @param date
   */
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

  /**
   * Won't do anything if the new time slot is the same already selected
   * @param timeSlot
   */
  setSelectedTimeSlot(timeSlot: string) {
    if (this.selectedTimeSlot === timeSlot) return;

    this.selectedTimeSlot = timeSlot;
    this.onTimeSlotSelected.next(this.selectedTimeSlot);
  }

  /**
   * Generates an array of 30' timeslots between 9:00 and 13:00, and between 16:00 and 20:00
   * Uses a closure as a means for memoization, given the method could get called multiple times
   */
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

  /**
   * Returns an array of time slots based on a given date and room
   * @param room
   * @param date
   * @returns Returns [] if nothing is found or if the room is invalid
   */
  getTimeSlots(room: string, date: Date): string[] {
    const roomDates = this.availableRoomDates[room];
    if (roomDates === undefined) return [];

    const year = roomDates[date.getFullYear()];
    const month = year ? year[date.getMonth() + 1] : false;
    const dayTimeSlots = month ? month[date.getDate()] : [];

    return dayTimeSlots || [];
  }

  getAvailableDatesForRoom = (room: string): RoomDates => {
    // Uses JSON conversion back and forth to return a deep copy of the object instead of a reference
    return this.availableRoomDates[room] ? JSON.parse(JSON.stringify(this.availableRoomDates[room])) : {};
  };

  private makeReservationDate(date: Date): ReservationDate {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  private fromReservationDateToDate(reservationDate: ReservationDate): Date {
    const date = new Date();
    date.setFullYear(reservationDate.year);
    date.setMonth(reservationDate.month - 1);
    date.setDate(reservationDate.day);

    return date;
  }

  /**
   * Uses room, date, and timeSlot to check if the whole set is available
   * @param reservation
   * @returns true if the desired time slot exists and is available
   */
  private validateReservation(reservation: Reservation): boolean {
    const validRoom: boolean = this.availableRooms.includes(reservation.room);
    if (!validRoom) return false;

    const date = this.fromReservationDateToDate(reservation.date);
    const timeSlots: string[] = this.getTimeSlots(reservation.room, date);
    const validTimeSlot = timeSlots.includes(reservation.timeSlot);

    return validTimeSlot;
  }

  /**
   * @returns true if the selected timeSlot is available on the selected room and date
   */
  isReadyToMakeReservation(): boolean {
    const reservationDate = this.makeReservationDate(this.selectedDate);
    return this.validateReservation({
      room: this.selectedRoom,
      date: reservationDate,
      timeSlot: this.selectedTimeSlot,
    });
  }

  /**
   * Validates if a reservation is doable (this would be validated on the server) and saves it if valid (again, should be server-side)
   * To fake the server returning a different set of available dates, I'll mutate this.availableRoomDates after a successful selection
   */
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

      // I've kept this logs because there's no other way to verify that the reservations are truly being made
      console.log('Reservation Succeeded!');
      console.log(this.savedReservations);

      this.setSelectedRoom('');
    } else {
      console.log('ERROR: reservation failed validation');
    }
  }
}
