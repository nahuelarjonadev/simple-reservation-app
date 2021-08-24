import { Injectable } from '@angular/core';
import { RoomDates } from './room-dates.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MakeReservationService {
  constructor() {}

  private onRoomSelected = new Subject<string>();

  private availableRooms: string[] = ['room1', 'room2', 'room3'];
  private selectedRoom: string = '';
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

  getAvailableRooms(): string[] {
    return [...this.availableRooms];
  }

  getSelectedRoom(): string {
    return this.selectedRoom;
  }

  setSelectedRoom(room: string) {
    this.selectedRoom = room;
    this.onRoomSelected.next(this.selectedRoom);
  }

  getAvailableDatesForRoom = (room: string): RoomDates => {
    return this.availableRoomDates[room] ? JSON.parse(JSON.stringify(this.availableRoomDates[room])) : {};
  };
}
