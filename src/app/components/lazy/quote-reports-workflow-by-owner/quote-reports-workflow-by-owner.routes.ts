import { Routes } from '@angular/router';
import { QuoteReportsWorkflowByOwnerComponent } from './quote-reports-workflow-by-owner.component';
import { QuoteReportsWorkflowByOwnerResolverService } from './resolver/quote-reports-workflow-by-owner-resolver.service';

export const QuoteReportsWorkflowByOwnerRoutes: Routes = [
  {
    path: '',
    component: QuoteReportsWorkflowByOwnerComponent,
    resolve: {
      pageData: QuoteReportsWorkflowByOwnerResolverService,
    },
    //pathMatch: 'full',
    //redirectTo: 'QuoteReportsWorkflowByOwnerComponent',
  },
];
