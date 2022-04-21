import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [],
  exports: [
    ... UiModule.materials
  ]
})
export class UiModule {
  public static materials: any[] = [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ];
}
