import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MakeReservationService } from '../make-reservation.service';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.sass'],
})
export class TimeSelectorComponent implements OnInit {
  constructor(private makeReservationService: MakeReservationService) {}

  @ViewChild(MatSelectionList)
  matList!: MatSelectionList;

  // cache this locally for performance
  private availableTimeSlots: string[] = [];

  isTimeAvailable(time: string): boolean {
    return this.availableTimeSlots.includes(time);
  }

  getTimeSlots(): string[] {
    return this.makeReservationService.generateBaseTimeSlots();
  }

  setTimeSlot(change: MatSelectionListChange) {
    this.makeReservationService.setSelectedTimeSlot(change.options[0]?.value);
  }

  ngOnInit(): void {
    this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();

    this.makeReservationService.getOnRoomSelectedListener().subscribe(() => {
      this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();
      this.makeReservationService.setSelectedTimeSlot('');
    });

    this.makeReservationService.getOnDateSelectedListener().subscribe(() => {
      this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();
      this.makeReservationService.setSelectedTimeSlot('');
    });

    this.makeReservationService.getOnTimeSlotSelectedListener().subscribe((timeSlot: string) => {
      this.matList.deselectAll();
      this.matList.options.forEach((...[option]) => {
        if (option.value === timeSlot && !option.selected) option.toggle();
      });
    });
  }
}
