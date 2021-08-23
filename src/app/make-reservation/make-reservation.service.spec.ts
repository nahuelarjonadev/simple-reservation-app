import { TestBed } from '@angular/core/testing';

import { MakeReservationService } from './make-reservation.service';

describe('MakeReservationService', () => {
  let service: MakeReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a getAvailableRooms method', () => {
    expect(service.getAvailableRooms).toBeTruthy();
  });

  it('should have a non-empty Available Rooms property', () => {
    const rooms = service.getAvailableRooms();
    expect(rooms.length).toBeGreaterThan(0);
  });

  it('getAvailableRooms should not return a reference', () => {
    const rooms1 = service.getAvailableRooms();
    const rooms2 = service.getAvailableRooms();

    expect(rooms1 === rooms2).toBeFalsy();
  });
});
