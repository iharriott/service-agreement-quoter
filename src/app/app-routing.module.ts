import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'quote-list',
    loadChildren: () =>
      import('./components/lazy/quote-list/quote-list.module').then(
        (m) => m.QuoteListModule
      ),
  },
  {
    path: 'quote-overview/:quoteId',
    loadChildren: () =>
      import('./components/lazy/quote-overview/quote-overview.module').then(
        (m) => m.QuoteOverviewModule
      ),
  },
  {
    path: 'quote-workflow',
    loadChildren: () =>
      import('./components/lazy/quote-workflow/quote-workflow.module').then(
        (m) => m.QuoteWorkflowModule
      ),
  },
  {
    path: 'quote-workflow-add-events',
    loadChildren: () =>
      import('./components/lazy/quote-workflow-add-events/quote-workflow-add-events.module').then(
        (m) => m.QuoteWorkflowAddEventsModule
      ),
  },
  {
    path: 'work-flow-by-owner',
    loadChildren: () =>
      import(
        './components/lazy/quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.module'
      ).then((m) => m.QuoteReportsWorkflowByOwnerModule),
  },
  {
    path: 'work-flow-by-store',
    loadChildren: () =>
      import(
        './components/lazy/quote-reports-workflow-by-store/quote-reports-workflow-by-store.module'
      ).then((m) => m.QuoteReportsWorkflowByStoreModule),
  },
  {
    path: 'personalize',
    loadChildren: () =>
      import('./components/lazy/personalize/personalize.module').then(
        (m) => m.PersonalizeModule
      ),
  },
  { path: 'error', redirectTo: 'error', pathMatch: 'full' },
  { path: '', redirectTo: 'quote-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
