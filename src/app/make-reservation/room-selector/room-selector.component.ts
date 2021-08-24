import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MakeReservationService } from '../make-reservation.service';

/** Renders a dropdown from which the user picks a room for the reservation
 * The room will be reset to empty when a successful reservation is made
 */
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
    // if the room changes from the outside, update the value on the drop down
    this.makeReservationService.getOnRoomSelectedListener().subscribe((room: string) => {
      this.matSelect.writeValue(room);
    });
  }
}
