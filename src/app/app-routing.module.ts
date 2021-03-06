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
  { path: 'error', redirectTo: 'error', pathMatch: 'full' },
  { path: '', redirectTo: 'quote-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
