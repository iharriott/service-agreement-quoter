import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteListComponent } from './quote-list.component';
import { QuoteListResolverService } from './resolver/quote-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: QuoteListComponent,
    resolve: {
      pageData: QuoteListResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteListRoutingModule {}
