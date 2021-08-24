export interface Reservation {
  room: string;
  date: ReservationDate;
  timeSlot: string;
}

export interface RoomDates {
  [Year: number]: {
    [Month: number]: {
      [Day: number]: string[];
    };
  };
}

export interface ReservationDate {
  year: number;
  month: number;
  day: number;
}
