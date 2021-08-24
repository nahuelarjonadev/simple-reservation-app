import { Component, OnInit } from '@angular/core';
import { MakeReservationService } from '../make-reservation.service';

@Component({
  selector: 'app-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.sass'],
})
export class RoomSelectorComponent implements OnInit {
  constructor(private makeReservationService: MakeReservationService) {}

  getAvailableRooms(): string[] {
    return this.makeReservationService.getAvailableRooms();
  }

  setSelectedRoom(room: string) {
    this.makeReservationService.setSelectedRoom(room);
  }

  ngOnInit(): void {
    return;
  }
}
