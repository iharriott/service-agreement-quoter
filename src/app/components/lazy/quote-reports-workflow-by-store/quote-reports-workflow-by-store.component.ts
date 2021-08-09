import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from 'shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import { FooterColumns } from 'shared-components-lib';
import { BehaviorSubject } from 'rxjs';
import { SharedFormActionsOutputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import {
  SharedFormsConfig,
  StoreSummaryRoot,
} from './quote-reports-workflow-by-store.model';
import { QuoteReportsWorkflowByStoreService } from './quote-reports-workflow-by-store.service';
import { QuoteReportsFilter } from '../quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.model';
import { FormField } from 'src/app/shared/models/form-field.model';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-quote-reports-workflow-by-store',
  templateUrl: './quote-reports-workflow-by-store.component.html',
  styleUrls: ['./quote-reports-workflow-by-store.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteReportsWorkflowByStoreComponent implements OnInit {
  drillReady = false;
  filtersLoaded = true;
  footerRow: { [index: string]: string } = {};
  footerColumns!: FooterColumns[];
  gridData!: DataDefinition | undefined;
  tableData!: StoreSummaryRoot | undefined;

  /*** Child Components ***/
  sharedFilterConfig: SharedFormsConfig | null | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(
    private quoteReportWorkflowByStoreService: QuoteReportsWorkflowByStoreService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    const formData: QuoteReportsFilter | undefined =
      this.quoteReportWorkflowByStoreService.filterData;
    const formConfig: FormField[] | undefined =
      this.quoteReportWorkflowByStoreService.filterConfig;

    this.sharedFilterConfig = this.formService.notifySharedFormsComponent(
      formData,
      formConfig
    );
    this.gridData = this.quoteReportWorkflowByStoreService.gridDefinition;
    this.tableData = this.quoteReportWorkflowByStoreService.gridData;

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.storeSummary,
    });
  }

  //TODO
  handleSharedFormsOutputChange(event: SharedFormActionsOutputConfig): void {
    console.log(`form filter output in store ${JSON.stringify(event)}`);
  }
}
