import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MakeReservationService {
  constructor() {}

  private availableRooms: string[] = ['room1', 'room2', 'room3'];

  getAvailableRooms(): string[] {
    return [...this.availableRooms];
  }
}
