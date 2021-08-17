import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SharedComponentsLibModule,
  SharedFormActionsModule,
} from 'shared-components-lib';
import { QuoteReportsWorkflowByStoreComponent } from './quote-reports-workflow-by-store.component';
import { QuoteReportsWorkflowByStoreResolver } from './quote-reports-workflow-by-store.resolver';
import { RouterModule, Routes } from '@angular/router';
import { QuoteReportsWorkflowByStoreService } from './quote-reports-workflow-by-store.service';
import { WorkflowReportFilterService } from '../../../shared/services/workflow-report-filter.service';

const routes: Routes = [
  {
    path: '**',
    component: QuoteReportsWorkflowByStoreComponent,
    resolve: {
      pageData: QuoteReportsWorkflowByStoreResolver,
    },
  },
];

@NgModule({
  declarations: [QuoteReportsWorkflowByStoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsLibModule,
    SharedFormActionsModule,
  ],
  providers: [
    QuoteReportsWorkflowByStoreService,
    QuoteReportsWorkflowByStoreResolver,
    WorkflowReportFilterService,
  ],
})
export class QuoteReportsWorkflowByStoreModule {}
