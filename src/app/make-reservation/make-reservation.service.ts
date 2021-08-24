import { Injectable } from '@angular/core';
import { RoomDates } from './room-dates.model';

@Injectable({
  providedIn: 'root',
})
export class MakeReservationService {
  constructor() {}

  private availableRooms: string[] = ['room1', 'room2', 'room3'];
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

  getAvailableRooms(): string[] {
    return [...this.availableRooms];
  }

  getAvailableDatesForRoom = (room: string): RoomDates => {
    return JSON.parse(JSON.stringify(this.availableRoomDates[room]));
  };
}
