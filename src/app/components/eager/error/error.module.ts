import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorComponent } from './error.component';

const errorRoutes: Routes = [
  {
    path: 'error',
    children: [{ path: '', component: ErrorComponent }],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(errorRoutes), SharedModule],
  declarations: [ErrorComponent],
  providers: [],
})
export class ErrorModule {}
