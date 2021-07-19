import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { QuoteListResolverData } from './models/quote-list.model';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject();
  data: QuoteListResolverData;

  constructor(private route: ActivatedRoute) {
    this.data = this.route.snapshot.data['pageData'];
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
