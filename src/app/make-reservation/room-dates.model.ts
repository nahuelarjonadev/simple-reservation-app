export interface RoomDates {
  [Year: number]: {
    [Month: number]: {
      [Day: number]: string[];
    };
  };
}
