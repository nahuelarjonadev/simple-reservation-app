import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  exports: [MatToolbarModule, MatSelectModule],
})
export class AngularMaterialModule {}
