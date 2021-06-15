import { NgModule } from '@angular/core';
import { MaterialsModule } from './modules/material.module';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MaterialsModule, LayoutModule, FormsModule, ReactiveFormsModule],
  declarations: [],
  providers: [],
})
export class SharedOthersModule {}
