import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SharedComponentsLibModule,
  SharedFormActionsModule,
} from 'shared-components-lib';
import { QuoteWorkflowComponent } from './quote-workflow.component';
import { QuoteWorkflowResolver } from './quote-workflow.resolver';
import { RouterModule, Routes } from '@angular/router';
import { QuoteWorkflowService } from './quote-workflow.service';
import { WorkflowReportFilterService } from '../../../shared/services/workflow-report-filter.service';

const routes: Routes = [
  {
    path: '**',
    component: QuoteWorkflowComponent,
    resolve: {
      pageData: QuoteWorkflowResolver,
    },
  },
];

@NgModule({
  declarations: [QuoteWorkflowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsLibModule,
    SharedFormActionsModule,
  ],
  providers: [
    QuoteWorkflowService,
    QuoteWorkflowResolver,
    WorkflowReportFilterService,
  ],
})
export class QuoteWorkflowModule {}
