import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteListRoutingModule } from './quote-list-routing.module';
import { QuoteListComponent } from './quote-list.component';
import { QuoteListService } from './services/quote-list.service';
import { QuoteListResolverService } from './resolver/quote-list-resolver.service';
@NgModule({
  declarations: [QuoteListComponent],
  providers: [QuoteListService, QuoteListResolverService],
  imports: [CommonModule, QuoteListRoutingModule],
})
export class QuoteListModule {}
