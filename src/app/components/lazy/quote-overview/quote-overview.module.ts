import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SharedComponentsLibModule,
  SharedFormActionsModule,
} from 'shared-components-lib';
import { SharedModule } from '../../../shared/shared.module';
import { QuoteOverviewComponent } from './quote-overview.component';
import { RouterModule, Routes } from '@angular/router';
import { QuoteOverviewResolver } from './quote-overview.resolver';
import { QuoteOverviewService } from './quote-overview.service';
import { SharedOthersModule } from 'src/app/shared/others/shared-others.module';

const routes: Routes = [
  {
    path: '**',
    component: QuoteOverviewComponent,
    resolve: {
      pageData: QuoteOverviewResolver,
    },
  },
];

@NgModule({
  declarations: [QuoteOverviewComponent],
  providers: [QuoteOverviewService, QuoteOverviewResolver],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule.forChild(),
    SharedOthersModule,
    SharedComponentsLibModule,
    SharedFormActionsModule,
  ],
})
export class QuoteOverviewModule {}
