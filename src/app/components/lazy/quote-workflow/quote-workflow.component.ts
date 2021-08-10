import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from 'shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import { FooterColumns } from 'shared-components-lib';
import { BehaviorSubject } from 'rxjs';
import { SharedFormActionsOutputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import {
  SharedFormsConfig,
  QuoteWorkflowSummaryRoot,
} from './quote-workflow.model';
import { QuoteWorkflowService } from './quote-workflow.service';
import { QuoteReportsFilter } from '../quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.model';
import { FormField } from 'src/app/shared/models/form-field.model';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-quote-workflow',
  templateUrl: './quote-workflow.component.html',
  styleUrls: ['./quote-workflow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteWorkflowComponent implements OnInit {
  drillReady = false;
  filtersLoaded = true;
  footerRow: { [index: string]: string; } = {};
  footerColumns!: FooterColumns[];
  gridData!: DataDefinition | undefined;
  tableData!: QuoteWorkflowSummaryRoot | undefined;

  /*** Child Components ***/
  sharedFilterConfig: SharedFormsConfig | null | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(
    private quoteWorkflowService: QuoteWorkflowService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    const formData: QuoteReportsFilter | undefined =
      this.quoteWorkflowService.filterData;
    const formConfig: FormField[] | undefined =
      this.quoteWorkflowService.filterConfig;

    this.sharedFilterConfig = this.formService.notifySharedFormsComponent(
      formData,
      formConfig
    );
    this.gridData = this.quoteWorkflowService.gridDefinition;
    this.tableData = this.quoteWorkflowService.gridData;

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.quoteWorkflowSummary,
    });
  }

  //TODO
  handleSharedFormsOutputChange(event: SharedFormActionsOutputConfig): void {
    console.log(`form filter output in store ${JSON.stringify(event)}`);
  }

}
