import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './header/header.component';
import { RoomSelectorComponent } from './make-reservation/room-selector/room-selector.component';
import { DateSelectorComponent } from './make-reservation/room-selector/date-selector/date-selector.component';

@NgModule({
  declarations: [AppComponent, AppHeaderComponent, RoomSelectorComponent, DateSelectorComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, AngularMaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
