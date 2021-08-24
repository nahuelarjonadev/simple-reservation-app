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

  describe('getAvailableRooms method', () => {
    it('should be a member', () => {
      expect(service.getAvailableRooms).toBeTruthy();
    });

    it('should return a non-empty array', () => {
      const rooms = service.getAvailableRooms();
      expect(rooms.length).toBeGreaterThan(0);
    });

    it('should not return a reference', () => {
      const rooms1 = service.getAvailableRooms();
      const rooms2 = service.getAvailableRooms();

      expect(rooms1 === rooms2).toBeFalsy();
    });
  });

  describe('getAvailableDatesForRoom method', () => {
    it('should be a member', () => {
      expect(service.getAvailableDatesForRoom).toBeTruthy();
    });

    it('should not return a reference', () => {
      const room = service.getAvailableRooms()[0];
      const dates1 = service.getAvailableDatesForRoom(room);
      const dates2 = service.getAvailableDatesForRoom(room);
      expect(dates1 === dates2).toBeFalsy();
    });
  });
});
