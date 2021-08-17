import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteReportsWorkflowByOwnerComponent } from './quote-reports-workflow-by-owner.component';
import { RouterModule, Routes } from '@angular/router';
import {
  SharedComponentsLibModule,
  SharedFormActionsModule,
} from 'shared-components-lib';
import { QuoteReportsWorkflowByOwnerService } from './quote-reports-workflow-by-owner.service';
import { QuoteReportsWorkflowByOwnerResolver } from './quote-reports-workflow-by-owner-resolver';
import { WorkflowReportFilterService } from '../../../shared/services/workflow-report-filter.service';

const routes: Routes = [
  {
    path: '**',
    component: QuoteReportsWorkflowByOwnerComponent,
    resolve: {
      pageData: QuoteReportsWorkflowByOwnerResolver,
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
    QuoteReportsWorkflowByOwnerService,
    QuoteReportsWorkflowByOwnerResolver,
    WorkflowReportFilterService,
  ],
})
export class QuoteReportsWorkflowByOwnerModule {}
