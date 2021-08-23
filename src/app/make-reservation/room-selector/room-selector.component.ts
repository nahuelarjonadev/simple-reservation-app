import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.sass'],
})
export class RoomSelectorComponent implements OnInit {
  constructor() {}

  private availableRooms: string[] = ['1', '2'];

  getAvailableRooms(): string[] {
    return [...this.availableRooms];
  }

  ngOnInit(): void {
    return;
  }
}
