import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MakeReservationService } from '../make-reservation.service';

/**
 * Displays a list of time slots from which the user selects the desired one
 * Time slots are enabled only if they are available
 * Changing the room or the date will reset the time slot selection
 */
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
    // includes is an O(n) operation, but given how small the array is I think this is fine for demo purposes
    return this.availableTimeSlots.includes(time);
  }

  getTimeSlots(): string[] {
    // this method runs multiple times, so I had to make sure the result from generate was cached
    return this.makeReservationService.generateBaseTimeSlots();
  }

  setTimeSlot(change: MatSelectionListChange) {
    this.makeReservationService.setSelectedTimeSlot(change.options[0]?.value);
  }

  ngOnInit(): void {
    // This ensures the initial batch of timeslots is properly enabled or disabled
    this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();

    // Reset selected time slot if the room changes
    this.makeReservationService.getOnRoomSelectedListener().subscribe(() => {
      this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();
      this.makeReservationService.setSelectedTimeSlot('');
    });

    // Reset selected time slot if the date changes
    this.makeReservationService.getOnDateSelectedListener().subscribe(() => {
      this.availableTimeSlots = this.makeReservationService.getTimeSlotsForCurrentSelection();
      this.makeReservationService.setSelectedTimeSlot('');
    });

    // This marks the selected time slot in the view. Again, O(n) is fine given how small n is
    this.makeReservationService.getOnTimeSlotSelectedListener().subscribe((timeSlot: string) => {
      this.matList.deselectAll();
      this.matList.options.forEach((...[option]) => {
        if (option.value === timeSlot && !option.selected) option.toggle();
      });
    });
  }
}
