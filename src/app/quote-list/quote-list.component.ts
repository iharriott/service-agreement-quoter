import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataDefinition } from '../../../../angular-shared-components/dist/shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from '../../../../angular-shared-components/dist/shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import {
  QuoteListResolverData,
  QuotesGetQuotesForViewResult,
} from './models/quote-list.model';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject();
  data: QuoteListResolverData;
  gridData!: DataDefinition;
  tableData!: QuotesGetQuotesForViewResult;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(private route: ActivatedRoute) {
    this.data = this.route.snapshot.data['pageData'];
    this.gridData = this.data.dcfComponentGetComponentForViewResult;
    this.tableData = this.data.quotesGetQuotesForViewResult;

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData.quotesList,
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
