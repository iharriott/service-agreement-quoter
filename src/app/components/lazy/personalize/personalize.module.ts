import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalizeComponent } from './personalize.component';
import { SharedFormActionsModule } from 'shared-components-lib';
import { SharedModule } from '../../../shared/shared.module';
import { PersonalizeService } from './personalize.service';
import { PersonalizeResolver } from './personalize.resolver';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: PersonalizeComponent,
    resolve: {
      personalize: PersonalizeResolver,
    },
  },
];

@NgModule({
  declarations: [PersonalizeComponent],
  providers: [PersonalizeService, PersonalizeResolver],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule.forChild(),
    SharedFormActionsModule,
  ],
})
export class PersonalizeModule {}
