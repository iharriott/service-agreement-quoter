import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from 'shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import { FooterColumns } from 'shared-components-lib';
import { BehaviorSubject } from 'rxjs';
import { SharedFormActionsOutputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import { SharedFormsConfig, PackageListRoot } from './quote-workflow-package-list.model';
import { QuoteWorkflowPackageListService } from './quote-workflow-package-list.service';
import {
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from '../../quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.model';
import { FormField } from '../../../../shared/models/form-field.model';
import { FormService } from '../../../../shared/services/form.service';
import { Router } from '@angular/router';
import { WorkflowReportFilterService } from '../../../../shared/services/workflow-report-filter.service';
import { Emitters } from '../../quote-reports-workflow-by-owner/emitters/emitters';

@Component({
  selector: 'app-quote-workflow-package-list',
  templateUrl: './quote-workflow-package-list.component.html',
  styleUrls: ['./quote-workflow-package-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteWorkflowPackageListComponent implements OnInit {
  drillReady = false;
  filtersLoaded = true;
  footerRow: { [index: string]: string; } = {};
  footerColumns!: FooterColumns[];
  gridData!: DataDefinition | undefined;
  tableData!: PackageListRoot | undefined;

  /*** Child Components ***/
  sharedFilterConfig: SharedFormsConfig | null | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(
    private quoteWorkflowPackageListService: QuoteWorkflowPackageListService,
    private formService: FormService,
    private router: Router,
    private workflowReportFilterService: WorkflowReportFilterService
  ) { }

  ngOnInit(): void {
    const formData: QuoteReportsFilter | undefined =
      this.quoteWorkflowPackageListService.filterData;
    const formConfig: FormField[] | undefined =
      this.quoteWorkflowPackageListService.filterConfig;

    this.sharedFilterConfig = this.formService.notifySharedFormsComponent(
      formData,
      formConfig,
      this.sharedFilterConfig
    );

    this.gridData = this.getGridData();
    this.tableData = this.quoteWorkflowPackageListService.gridData;

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.packageList,
    });

  }

  handleSharedFormsOutputChange(event: SharedFormActionsOutputConfig): void {
    const reportParams: QuoteReportWorkflowParams =
      this.workflowReportFilterService.getReportFilterParams(event);

    const reportFilter: QuoteReportsFilter =
      this.workflowReportFilterService.getReportFilter(event);

    Emitters.reportParams = reportParams;
    Emitters.reportFilter = reportFilter;
    this.quoteWorkflowPackageListService
      .getQuoteWorkflowPackageList(reportParams)
      .subscribe((data) => {
        this.tableData = data;

        this.listData$.next({
          isLoaded: true,
          payload: this.tableData?.packageList,
        });
      });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleRowClicked(event: any): void {
    this.router.navigate([`quote-overview/${event.payload.quoteId}`]);
  }

  getGridData(): any {
    const gridData: any = {
      definition: {
        componentId: 3039,
        componentTypeId: 1,
        name: 'Package List',
        description: 'Package List Grid',
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
          fieldId: 3384,
          fieldName: 'packageName',
          template: null,
          headerText: 'Package Name',
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
          fieldId: 3385,
          fieldName: 'description',
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
          fieldId: 3386,
          fieldName: 'events',
          template: null,
          headerText: 'Events',
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
          fieldId: 3387,
          fieldName: 'occurences',
          template: null,
          headerText: 'Occurences',
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
          fieldId: 3388,
          fieldName: 'warnings',
          template: null,
          headerText: 'Warnings',
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
      ],
    };
    return gridData;
  }

}
