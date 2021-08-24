import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

import { MakeReservationService } from '../make-reservation.service';

import { RoomSelectorComponent } from './room-selector.component';

const makeReservationServiceStub: Partial<MakeReservationService> = {
  getAvailableRooms() {
    return ['room1', 'room2'];
  },
};

describe('RoomSelectorComponent', () => {
  let component: RoomSelectorComponent;
  let fixture: ComponentFixture<RoomSelectorComponent>;
  let makeReservationService: MakeReservationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomSelectorComponent],
      imports: [MatSelectModule, MatOptionModule, NoopAnimationsModule],
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

  it('getAvailableRooms should return the same rooms as the service', () => {
    const availableRooms = component.getAvailableRooms();
    const availableRoomsService = makeReservationService.getAvailableRooms();
    expect(availableRooms.toString() === availableRoomsService.toString()).toBeTrue();
  });

  it('mat-select should create a mat-option for each available room', async () => {
    const matSelect = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    matSelect.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // options will be rendered inside OverlayContainer
      const overlay = TestBed.inject(OverlayContainer).getContainerElement();

      const matOptions = overlay.querySelectorAll<HTMLElement>('mat-option');
      const availableRooms = makeReservationService.getAvailableRooms();

      expect(matOptions.length === availableRooms.length).toBeTrue();
    });
  });

  it('each mat-option value should match content of corresponding available rooms', async () => {
    const matSelect = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    matSelect.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // options will be rendered inside OverlayContainer
      const overlay = TestBed.inject(OverlayContainer).getContainerElement();

      const matOptions = overlay.querySelectorAll<HTMLElement>('mat-option');
      const availableRooms = makeReservationService.getAvailableRooms();

      const allOptionsMatchTheirRoom = availableRooms.reduce(
        (...[acc, room, i]) => acc && matOptions[i].innerText === room,
        true
      );

      expect(allOptionsMatchTheirRoom).toBeTrue();
    });
  });
});
