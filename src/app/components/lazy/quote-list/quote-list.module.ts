import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteListComponent } from './quote-list.component';
import {
  SharedComponentsLibModule,
  SharedFormActionsModule,
} from 'shared-components-lib';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuoteListService } from './quote-list.service';
import { QuoteListResolver } from './quote-list.resolver';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: QuoteListComponent,
    resolve: {
      pageData: QuoteListResolver,
    },
  },
];

@NgModule({
  declarations: [QuoteListComponent],
  providers: [QuoteListService, QuoteListResolver],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule.forChild(),
    SharedComponentsLibModule,
    SharedFormActionsModule,
  ],
})
export class QuoteListModule {}
