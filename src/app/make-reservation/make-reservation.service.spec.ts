import { TestBed, waitForAsync } from '@angular/core/testing';

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

  describe('getSelectedRoom and setSelectedRoom methods', () => {
    it('should return an empty room when initialized', () => {
      expect(service.getSelectedRoom()).toEqual('');
    });

    it('should return the selected room after setting it', () => {
      const room = 'testRoom';
      service.setSelectedRoom(room);
      expect(service.getSelectedRoom()).toEqual(room);
    });

    it(
      'should emit onSelectedRoom after setting a room',
      waitForAsync(() => {
        let onRoomSelected = service.getOnRoomSelectedListener();
        const roomToSelect = 'room2';
        onRoomSelected.subscribe((room: string) => {
          expect(room).toEqual(roomToSelect);
        });

        service.setSelectedRoom(roomToSelect);
      })
    );
  });

  describe('getSelectedDate and setSelectedDate methods', () => {
    it('should return the selected room after setting it', () => {
      const date = new Date();
      service.setSelectedDate(date);
      expect(service.getSelectedDate()).toEqual(date);
    });

    it(
      'should emit onSelectedDate after setting a date',
      waitForAsync(() => {
        let onDateSelected = service.getOnDateSelectedListener();
        const dateToSelect = new Date();
        onDateSelected.subscribe((date: Date) => {
          expect(date).toEqual(date);
        });

        service.setSelectedDate(dateToSelect);
      })
    );
  });

  describe('getTimeSlots', () => {
    it('should return [] if room not found', () => {
      const date = new Date();
      service.setSelectedDate(date);
      expect(service.getTimeSlots('', new Date())).toEqual([]);
    });

    it(
      'should emit onSelectedDate after setting a date',
      waitForAsync(() => {
        let onDateSelected = service.getOnDateSelectedListener();
        const dateToSelect = new Date();
        onDateSelected.subscribe((date: Date) => {
          expect(date).toEqual(date);
        });

        service.setSelectedDate(dateToSelect);
      })
    );
  });

  describe('getAvailableDatesForRoom method', () => {
    it('should not return a reference', () => {
      const room = service.getAvailableRooms()[0];
      const dates1 = service.getAvailableDatesForRoom(room);
      const dates2 = service.getAvailableDatesForRoom(room);
      expect(dates1 === dates2).toBeFalsy();
    });

    it("should return {} if '' is requested", () => {
      const dates = service.getAvailableDatesForRoom('');
      expect(JSON.stringify(dates)).toEqual('{}');
    });
  });
});
