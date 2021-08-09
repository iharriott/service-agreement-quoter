import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from 'shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import { FooterColumns } from 'shared-components-lib';
import { BehaviorSubject } from 'rxjs';
import {
  OwnerSummaryRoot,
  QuoteReportsFilter,
} from './quote-reports-workflow-by-owner.model';
import { QuoteReportWorkflowByOwnerService } from './quote-report-workflow-by-owner.service';

import { SharedFormsConfig } from './quote-reports-workflow-by-owner.model';
import { FormService } from 'src/app/shared/services/form.service';
import { FormField } from 'src/app/shared/models/form-field.model';
import { SharedFormActionsOutputConfig } from '../../../../../../angular-shared-components/dist/shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';

@Component({
  selector: 'app-quote-reports-workflow-by-owner',
  templateUrl: './quote-reports-workflow-by-owner.component.html',
  styleUrls: ['./quote-reports-workflow-by-owner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteReportsWorkflowByOwnerComponent implements OnInit {
  drillReady = false;
  filtersLoaded = true;
  footerRow: { [index: string]: string } = {};
  footerColumns!: FooterColumns[];
  gridData!: DataDefinition | undefined;
  tableData!: OwnerSummaryRoot | undefined;

  /*** Child Components ***/

  sharedFilterConfig: SharedFormsConfig | null | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(
    private quoteReportWorkflowByOwnerService: QuoteReportWorkflowByOwnerService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    const formData: QuoteReportsFilter | undefined =
      this.quoteReportWorkflowByOwnerService.filterData;
    const formConfig: FormField[] | undefined =
      this.quoteReportWorkflowByOwnerService.filterConfig;

    this.sharedFilterConfig = this.formService.notifySharedFormsComponent(
      formData,
      formConfig
    );
    this.gridData = this.quoteReportWorkflowByOwnerService.gridDefinition;
    this.tableData = this.quoteReportWorkflowByOwnerService.gridData;

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.ownerSummary,
    });
  }

  //TODO
  handleSharedFormsOutputChange(event: SharedFormActionsOutputConfig): void {
    console.log(`form filter output ${JSON.stringify(event)}`);
  }
}
