import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MakeReservationService {
  constructor() {}

  private availableRooms: string[] = ['1', '2', '3'];

  getAvailableRooms(): string[] {
    return [...this.availableRooms];
  }
}
