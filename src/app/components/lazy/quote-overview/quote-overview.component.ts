import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  QuotesGetQuoteHeaderListForViewDetail,
  QuotesGetQuotesForViewResult,
  QuotesGetQuotesHeaderForViewResult,
} from './quote-overview.model';
import { QuoteOverviewService } from './quote-overview.service';

@Component({
  selector: 'app-quote-overview',
  templateUrl: './quote-overview.component.html',
  styleUrls: ['./quote-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteOverviewComponent implements OnInit {
  panelOpenState!: boolean;
  quotesData!: QuotesGetQuotesForViewResult;
  quotesHeaderData!: QuotesGetQuotesHeaderForViewResult;
  quoteHeader!: QuotesGetQuoteHeaderListForViewDetail;
  constructor(private quoteOverviewService: QuoteOverviewService) {
    this.quotesData = this.quoteOverviewService.quotesData;
    this.quotesHeaderData = this.quoteOverviewService.quotesHeaderData;
    this.quoteHeader = this.quotesHeaderData?.quoteHeader[0];
  }

  ngOnInit(): void {}
}
