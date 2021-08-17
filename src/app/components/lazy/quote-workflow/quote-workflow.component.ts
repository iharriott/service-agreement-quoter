import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from 'shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import { FooterColumns } from 'shared-components-lib';
import { BehaviorSubject } from 'rxjs';
import { SharedFormActionsOutputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import { SharedFormsConfig, QuoteListRoot } from './quote-workflow.model';
import { QuoteWorkflowService } from './quote-workflow.service';
import {
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from '../quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.model';
import { FormField } from '../../../shared/models/form-field.model';
import { FormService } from '../../../shared/services/form.service';
import { Router } from '@angular/router';
import { WorkflowReportFilterService } from '../../../shared/services/workflow-report-filter.service';
import { Emitters } from '../quote-reports-workflow-by-owner/emitters/emitters';

@Component({
  selector: 'app-quote-workflow',
  templateUrl: './quote-workflow.component.html',
  styleUrls: ['./quote-workflow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteWorkflowComponent implements OnInit {
  drillReady = false;
  filtersLoaded = true;
  footerRow: { [index: string]: string } = {};
  footerColumns!: FooterColumns[];
  gridData!: DataDefinition | undefined;
  tableData!: QuoteListRoot | undefined;

  /*** Child Components ***/
  sharedFilterConfig: SharedFormsConfig | null | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(
    private quoteWorkflowService: QuoteWorkflowService,
    private formService: FormService,
    private router: Router,
    private workflowReportFilterService: WorkflowReportFilterService
  ) {}

  ngOnInit(): void {
    const formData: QuoteReportsFilter | undefined =
      this.quoteWorkflowService.filterData;
    const formConfig: FormField[] | undefined =
      this.quoteWorkflowService.filterConfig;

    this.sharedFilterConfig = this.formService.notifySharedFormsComponent(
      formData,
      formConfig,
      this.sharedFilterConfig
    );

    this.gridData = this.getGridData();
    this.tableData = this.quoteWorkflowService.gridData;

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.quoteList,
    });
  }

  handleSharedFormsOutputChange(event: SharedFormActionsOutputConfig): void {
    const reportParams: QuoteReportWorkflowParams =
      this.workflowReportFilterService.getReportFilterParams(event);

    const reportFilter: QuoteReportsFilter =
      this.workflowReportFilterService.getReportFilter(event);

    Emitters.reportParams = reportParams;
    Emitters.reportFilter = reportFilter;
    this.quoteWorkflowService
      .getQuoteWorkflow(reportParams)
      .subscribe((data) => {
        this.tableData = data;

        this.listData$.next({
          isLoaded: true,
          payload: this.tableData?.quoteList,
        });
      });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleRowClicked(event: any): void {
    this.router.navigate([`quote-overview/${event.payload.quoteId}`]);
  }

  //must be removed when dcf api is ready
  getGridData(): any {
    const gridData: any = {
      definition: {
        componentId: 3039,
        componentTypeId: 1,
        name: 'Workflow By Branch',
        description: 'Workflow by Branch Grid',
        componentType: 'Grid',
        roleId: 2147483646,
      },
      config: [
        {
          configName: 'ShowColumnBorder',
          configValue: 'false',
        },
        {
          configName: 'ShowTitle',
          configValue: 'True',
        },
        {
          configName: 'GroupBy',
          configValue: null,
        },
        {
          configName: 'ShowRowHover',
          configValue: 'True',
        },
        {
          configName: 'ShowTotalCount',
          configValue: null,
        },
        {
          configName: 'EnableExportToExcel',
          configValue: 'True',
        },
        {
          configName: 'ShowGridTools',
          configValue: 'True',
        },
        {
          configName: 'GroupHeaderTpl',
          configValue: '{groupValue}',
        },
        {
          configName: 'HideGroupedHeader',
          configValue: 'False',
        },
        {
          configName: 'PageSize',
          configValue: '50',
        },
        {
          configName: 'ColumnsDraggable',
          configValue: 'True',
        },
        {
          configName: 'TotalRow',
          configValue: null,
        },
        {
          configName: 'ShowExport',
          configValue: '1',
        },
      ],
      columns: [
        {
          fieldId: 3361,
          fieldName: 'quoteNumber',
          template: null,
          headerText: 'Quote No',
          parentFieldId: null,
          minWidth: null,
          width: null,
          flex: 1,
          headerCssClass: null,
          fieldCssClass: null,
          format: null,
          linkTemplate: null,
          sortable: true,
          displayOrder: 10,
          validatorType: null,
          validationExpression: null,
          validationBeginValue: null,
          validationEndValue: null,
          fieldDataType: null,
          useNull: null,
          show: false,
          showExcel: true,
          editable: false,
          primary: false,
        },
        {
          fieldId: 3362,
          fieldName: 'quoteStatus',
          template: null,
          headerText: 'Status',
          parentFieldId: null,
          minWidth: null,
          width: 100,
          flex: null,
          headerCssClass: null,
          fieldCssClass: null,
          format: null,
          linkTemplate: null,
          sortable: true,
          displayOrder: 20,
          validatorType: null,
          validationExpression: null,
          validationBeginValue: null,
          validationEndValue: null,
          fieldDataType: null,
          useNull: null,
          show: false,
          showExcel: true,
          editable: false,
          primary: false,
        },
        {
          fieldId: 3363,
          fieldName: 'division',
          template: null,
          headerText: 'Division',
          parentFieldId: null,
          minWidth: null,
          width: 100,
          flex: null,
          headerCssClass: null,
          fieldCssClass: null,
          format: null,
          linkTemplate: null,
          sortable: true,
          displayOrder: 30,
          validatorType: null,
          validationExpression: null,
          validationBeginValue: null,
          validationEndValue: null,
          fieldDataType: null,
          useNull: null,
          show: false,
          showExcel: true,
          editable: false,
          primary: false,
        },
        {
          fieldId: 3364,
          fieldName: 'quoteTypeDescription',
          template: null,
          headerText: 'Type',
          parentFieldId: null,
          minWidth: null,
          width: 100,
          flex: null,
          headerCssClass: null,
          fieldCssClass: null,
          format: null,
          linkTemplate: null,
          sortable: true,
          displayOrder: 40,
          validatorType: null,
          validationExpression: null,
          validationBeginValue: null,
          validationEndValue: null,
          fieldDataType: null,
          useNull: null,
          show: false,
          showExcel: true,
          editable: false,
          primary: false,
        },
        {
          fieldId: 3365,
          fieldName: 'quoteDate',
          template: null,
          headerText: 'Quote Date',
          parentFieldId: null,
          minWidth: null,
          width: 100,
          flex: null,
          headerCssClass: null,
          fieldCssClass: null,
          format: null,
          linkTemplate: null,
          sortable: true,
          displayOrder: 50,
          validatorType: null,
          validationExpression: null,
          validationBeginValue: null,
          validationEndValue: null,
          fieldDataType: null,
          useNull: null,
          show: false,
          showExcel: true,
          editable: false,
          primary: false,
        },
        {
          fieldId: 3366,
          fieldName: 'customerName',
          template: null,
          headerText: 'Customer',
          parentFieldId: null,
          minWidth: null,
          width: 100,
          flex: null,
          headerCssClass: null,
          fieldCssClass: null,
          format: null,
          linkTemplate: null,
          sortable: true,
          displayOrder: 60,
          validatorType: null,
          validationExpression: null,
          validationBeginValue: null,
          validationEndValue: null,
          fieldDataType: null,
          useNull: null,
          show: false,
          showExcel: true,
          editable: false,
          primary: false,
        },
        {
          fieldId: 3367,
          fieldName: 'quoteDescription',
          template: null,
          headerText: 'Description',
          parentFieldId: null,
          minWidth: null,
          width: 100,
          flex: null,
          headerCssClass: null,
          fieldCssClass: null,
          format: null,
          linkTemplate: null,
          sortable: true,
          displayOrder: 70,
          validatorType: null,
          validationExpression: null,
          validationBeginValue: null,
          validationEndValue: null,
          fieldDataType: null,
          useNull: null,
          show: false,
          showExcel: true,
          editable: false,
          primary: false,
        },
        {
          fieldId: 3368,
          fieldName: 'ownerFirstName',
          template: null,
          headerText: 'owner',
          parentFieldId: null,
          minWidth: null,
          width: 100,
          flex: null,
          headerCssClass: null,
          fieldCssClass: null,
          format: null,
          linkTemplate: null,
          sortable: true,
          displayOrder: 80,
          validatorType: null,
          validationExpression: null,
          validationBeginValue: null,
          validationEndValue: null,
          fieldDataType: null,
          useNull: null,
          show: false,
          showExcel: true,
          editable: false,
          primary: false,
        },
        {
          fieldId: 3383,
          fieldName: 'quoteTotal',
          template: null,
          headerText: 'Total',
          parentFieldId: null,
          minWidth: null,
          width: null,
          flex: 1,
          headerCssClass: null,
          fieldCssClass: null,
          format: null,
          linkTemplate: null,
          sortable: true,
          displayOrder: 90,
          validatorType: null,
          validationExpression: null,
          validationBeginValue: null,
          validationEndValue: null,
          fieldDataType: null,
          useNull: null,
          show: false,
          showExcel: true,
          editable: false,
          primary: false,
        },
      ],
    };
    return gridData;
  }
}
