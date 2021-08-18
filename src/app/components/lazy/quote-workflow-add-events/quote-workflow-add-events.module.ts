import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  SharedComponentsLibModule,
  SharedFormActionsModule,
} from 'shared-components-lib';
import { QuoteWorkflowAddEventsComponent } from './quote-workflow-add-events.component';
import { QuoteWorkflowPackageListComponent } from './quote-workflow-package-list/quote-workflow-package-list.component';
import { QuoteWorkflowEventsComponent } from './quote-workflow-events/quote-workflow-events.component';
import { QuoteWorkflowManualEventsComponent } from './quote-workflow-manual-events/quote-workflow-manual-events.component';
import { QuoteWorkflowPackageListService } from './quote-workflow-package-list/quote-workflow-package-list.service';
import { QuoteWorkflowEventsService } from './quote-workflow-events/quote-workflow-events.service';
import { QuoteWorkflowManualEventsService } from './quote-workflow-manual-events/quote-workflow-manual-events.service';
import { WorkflowReportFilterService } from '../../../shared/services/workflow-report-filter.service';
import { MatGridListModule } from '@angular/material/grid-list';

const routes: Routes = [
  {
    path: '**',
    component: QuoteWorkflowAddEventsComponent,

  },
];

@NgModule({
  declarations: [
    QuoteWorkflowAddEventsComponent,
    QuoteWorkflowPackageListComponent,
    QuoteWorkflowEventsComponent,
    QuoteWorkflowManualEventsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsLibModule,
    SharedFormActionsModule,
    MatGridListModule
  ],
  providers: [
    QuoteWorkflowPackageListService,
    QuoteWorkflowEventsService,
    QuoteWorkflowManualEventsService,
    WorkflowReportFilterService
  ]
})
export class QuoteWorkflowAddEventsModule { }
