import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';

import { AppHeaderComponent } from './header.component';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppHeaderComponent],
      imports: [MatToolbarModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a mat-toolbar', () => {
    const matToolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(matToolbar).toBeTruthy();
  });

  it('should display "Reservations Demo" text', () => {
    const span: HTMLSpanElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.innerText).toContain('Reservations Demo');
  });
});
