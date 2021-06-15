import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MainNavComponent } from './main-nav.component';

@NgModule({
  declarations: [MainNavComponent],
  imports: [CommonModule, SharedModule.forChild()],
  providers: [],
})
export class MainNavModule {}
