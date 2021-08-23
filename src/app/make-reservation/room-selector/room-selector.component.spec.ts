import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MakeReservationService } from '../make-reservation.service';

import { RoomSelectorComponent } from './room-selector.component';

const makeReservationServiceStub: Pick<MakeReservationService, keyof MakeReservationService> = {
  getAvailableRooms() {
    return ['1', '2'];
  },
};

describe('RoomSelectorComponent', () => {
  let component: RoomSelectorComponent;
  let fixture: ComponentFixture<RoomSelectorComponent>;
  let makeReservationService: MakeReservationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomSelectorComponent],
      providers: [{ provide: MakeReservationService, useValue: makeReservationServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomSelectorComponent);
    component = fixture.componentInstance;
    makeReservationService = fixture.debugElement.injector.get(MakeReservationService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a mat-select', () => {
    const matSelect = fixture.debugElement.query(By.css('mat-select'));
    expect(matSelect).toBeTruthy();
  });

  it('mat-select should create a mat-option for each available room', () => {
    const matOptions = fixture.debugElement.queryAll(By.css('mat-option'));
    const availableRooms = makeReservationService.getAvailableRooms();

    expect(matOptions.length === availableRooms.length).toBeTrue();
  });

  it('each mat-option value should match content of corresponding available rooms', () => {
    const matOptions = fixture.debugElement.queryAll(By.css('mat-option'));
    const availableRooms = makeReservationService.getAvailableRooms();

    let allOptionsMatchTheirRoom = true;
    for (let i = 0; i < availableRooms.length; i++) {
      const matOptionValue: string = matOptions[i].nativeElement.value;
      const roomValue: string = availableRooms[i];

      if (matOptionValue !== roomValue) {
        allOptionsMatchTheirRoom = false;
        break;
      }
    }

    expect(allOptionsMatchTheirRoom).toBeTrue();
  });
});
