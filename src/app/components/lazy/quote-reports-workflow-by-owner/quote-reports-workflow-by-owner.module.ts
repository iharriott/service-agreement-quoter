import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteReportsWorkflowByOwnerComponent } from './quote-reports-workflow-by-owner.component';
import { RouterModule, Routes } from '@angular/router';
import {
  SharedComponentsLibModule,
  SharedFormActionsModule,
} from 'shared-components-lib';
import { QuoteReportWorkflowService } from './services/quote-report-workflow.service';
import { QuoteReportsWorkflowByOwnerResolverService } from './resolver/quote-reports-workflow-by-owner-resolver.service';

const routes: Routes = [
  {
    path: '**',
    component: QuoteReportsWorkflowByOwnerComponent,
    resolve: {
      pageData: QuoteReportsWorkflowByOwnerResolverService,
    },
  },
];

@NgModule({
  declarations: [QuoteReportsWorkflowByOwnerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsLibModule,
    SharedFormActionsModule,
  ],
  providers: [
    QuoteReportWorkflowService,
    QuoteReportsWorkflowByOwnerResolverService,
  ],
})
export class QuoteReportsWorkflowByOwnerModule {}
