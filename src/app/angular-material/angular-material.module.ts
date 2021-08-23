import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  exports: [MatToolbarModule, MatSelectModule, MatOptionModule],
})
export class AngularMaterialModule {}
