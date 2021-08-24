import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MakeReservationService } from '../make-reservation.service';

@Component({
  selector: 'app-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.sass'],
})
export class RoomSelectorComponent implements OnInit {
  constructor(private makeReservationService: MakeReservationService) {}

  @ViewChild(MatSelect)
  matSelect!: MatSelect;

  getAvailableRooms(): string[] {
    return this.makeReservationService.getAvailableRooms();
  }

  setSelectedRoom(room: string) {
    this.makeReservationService.setSelectedRoom(room);
  }

  ngOnInit(): void {
    this.makeReservationService.getOnRoomSelectedListener().subscribe((room: string) => {
      this.matSelect.writeValue(room);
    });
  }
}
