import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from 'shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import { FooterColumns } from 'shared-components-lib';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  SharedFormActionsInputConfig,
  SharedFormActionsOutputConfig,
} from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import { AppConfig, MockData } from '../quote-list/mock.data';
import { FieldConfig } from 'shared-components-lib/lib/shared-form/shared/others/model/field.model';
import { SharedFormsConfig, StoreSummaryRoot } from './quote-reports-workflow-by-store.model';
import { QuoteReportsWorkflowByStoreService } from './quote-reports-workflow-by-store.service';

@Component({
  selector: 'app-quote-reports-workflow-by-store',
  templateUrl: './quote-reports-workflow-by-store.component.html',
  styleUrls: ['./quote-reports-workflow-by-store.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteReportsWorkflowByStoreComponent implements OnInit {

  drillReady = false;
  filtersLoaded = true;
  footerRow: { [index: string]: string; } = {};
  footerColumns!: FooterColumns[];
  gridData!: DataDefinition | undefined;
  tableData!: StoreSummaryRoot | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputData: any;
  /*** Child Components ***/
  sharedFilterConfig: SharedFormsConfig | null | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(private quoteReportWorkflowService: QuoteReportsWorkflowByStoreService) { }

  private initSharedFormsComponent(): void {
    this.sharedFilterConfig = {
      compConfig: {
        options: {
          isShow: false,
        },
        data: {
          fieldConfig: null,
          fieldData: null,
        },
      },
      inputChange: new Subject<SharedFormActionsInputConfig>(),
      compOutput: (event: SharedFormActionsOutputConfig): void => {
        this.handleSharedFormsOutputChange(event);
      },
    };
  }

  /**
   * Function to handle forms output change
   * @param event
   * @private
   */
  private handleSharedFormsOutputChange(
    event: SharedFormActionsOutputConfig
  ): void {
    this.outputData = event.data;
  }

  /**
   * Function to notify shared forms component
   * @return void
   * @private
   */
  private notifySharedFormsComponent(): void {
    const data: MockData | undefined =
      this.quoteReportWorkflowService.filterData;
    const config: AppConfig[] | undefined =
      this.quoteReportWorkflowService.filterConfig;
    if (data && config) {
      const fieldConfigs: FieldConfig[] = [];
      Object.keys(data).forEach((key: string) => {
        const appConfig: AppConfig | undefined = config.find(
          (cfg: AppConfig) => cfg.fieldName == key
        );
        if (appConfig) {
          const messages: any = {
            firstName: {
              required: 'This is a required field',
              maxlength: 'Max value allowed is 2',
            },
          };
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const fieldConfig: FieldConfig = {
            key: appConfig.fieldName,
            label: appConfig.fieldLabel,
            sequence: appConfig.displayOrder,
            fieldType: appConfig.fieldType,
            tooltip: appConfig.tooltip,
            info: appConfig.info,
            hint: appConfig.hint,
            readonly: appConfig.readOnly,
            validationMessages: messages,
            options: appConfig.options,
          };
          fieldConfigs.push(fieldConfig);
        }
      });
      if (this.sharedFilterConfig) {
        this.sharedFilterConfig.compConfig.options = {
          isShow: true,
          isError: false,
          readonly: false,
        };
        this.sharedFilterConfig.compConfig.data = {
          ...this.sharedFilterConfig?.compConfig.data,
          fieldConfig: {
            dynamicFormName: 'TestDynamicForm',
            fieldGroups: [
              {
                fieldGroupClassName: 'row',
                fieldTemplateType: 'default',
                fieldConfig: fieldConfigs,
              },
            ],
          },
          fieldData: data,
        };
        // FYI: This is how you need to update the child component
        // this.sharedFilterConfig?.inputChange.next(this.sharedFilterConfig?.compConfig);
        //console.log('testing filter app com');
      }
    }
  }

  ngOnInit(): void {
    // this.gridData = this.quoteReportWorkflowService.gridDefinition;
    this.gridData = this.getGridData();
    // this.tableData = this.quoteReportWorkflowService.gridData;
    this.tableData = this.getTableData();
    this.initSharedFormsComponent();
    this.notifySharedFormsComponent();
    console.log(`girdData = ${JSON.stringify(this.gridData)}`);
    console.log(`tableData = ${JSON.stringify(this.tableData?.storeSummary)}`);

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.storeSummary,
    });
  }

  getGridData(): any {
    const data: any = {
      "definition": {
        "componentId": 3039,
        "componentTypeId": 1,
        "name": "Workflow By Branch",
        "description": "Workflow by Branch Grid",
        "componentType": "Grid",
        "roleId": 2147483646
      },
      "config": [
        {
          "configName": "ShowColumnBorder",
          "configValue": "false"
        },
        {
          "configName": "ShowTitle",
          "configValue": "True"
        },
        {
          "configName": "GroupBy",
          "configValue": null
        },
        {
          "configName": "ShowRowHover",
          "configValue": "True"
        },
        {
          "configName": "ShowTotalCount",
          "configValue": null
        },
        {
          "configName": "EnableExportToExcel",
          "configValue": "True"
        },
        {
          "configName": "ShowGridTools",
          "configValue": "True"
        },
        {
          "configName": "GroupHeaderTpl",
          "configValue": "{groupValue}"
        },
        {
          "configName": "HideGroupedHeader",
          "configValue": "False"
        },
        {
          "configName": "PageSize",
          "configValue": "50"
        },
        {
          "configName": "ColumnsDraggable",
          "configValue": "True"
        },
        {
          "configName": "TotalRow",
          "configValue": null
        },
        {
          "configName": "ShowExport",
          "configValue": "1"
        }
      ],
      "columns": [
        {
          "fieldId": 3361,
          "fieldName": "storeName",
          "template": null,
          "headerText": "Branch Name",
          "parentFieldId": null,
          "minWidth": null,
          "width": null,
          "flex": 1,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 10,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 3362,
          "fieldName": "quoted",
          "template": null,
          "headerText": "Quoted",
          "parentFieldId": null,
          "minWidth": null,
          "width": 100,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 20,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 3363,
          "fieldName": "openQuote",
          "template": null,
          "headerText": "Open",
          "parentFieldId": null,
          "minWidth": null,
          "width": 100,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 30,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 3364,
          "fieldName": "submitted",
          "template": null,
          "headerText": "Submitted",
          "parentFieldId": null,
          "minWidth": null,
          "width": 100,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 40,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 3365,
          "fieldName": "accepted",
          "template": null,
          "headerText": "Won",
          "parentFieldId": null,
          "minWidth": null,
          "width": 100,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 50,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 3366,
          "fieldName": "rejected",
          "template": null,
          "headerText": "Lost",
          "parentFieldId": null,
          "minWidth": null,
          "width": 100,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 60,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 3367,
          "fieldName": "cancelled",
          "template": null,
          "headerText": "No Deal",
          "parentFieldId": null,
          "minWidth": null,
          "width": 100,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 70,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 3368,
          "fieldName": "closeRate",
          "template": null,
          "headerText": "Close Rate",
          "parentFieldId": null,
          "minWidth": null,
          "width": 100,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 80,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 3383,
          "fieldName": "salesrepName",
          "template": null,
          "headerText": "Owner",
          "parentFieldId": null,
          "minWidth": null,
          "width": null,
          "flex": 1,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 10,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 3384,
          "fieldName": "salesRepUserId",
          "template": null,
          "headerText": null,
          "parentFieldId": null,
          "minWidth": null,
          "width": null,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 10,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 17005,
          "fieldName": "approved",
          "template": null,
          "headerText": "Approved",
          "parentFieldId": null,
          "minWidth": null,
          "width": 100,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": true,
          "displayOrder": 45,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 17153,
          "fieldName": "quotedHidden",
          "template": null,
          "headerText": "Quoted($)",
          "parentFieldId": null,
          "minWidth": null,
          "width": null,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": null,
          "displayOrder": 25,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 17154,
          "fieldName": "openQuoteHidden",
          "template": null,
          "headerText": "Open($)",
          "parentFieldId": null,
          "minWidth": null,
          "width": null,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": null,
          "displayOrder": 35,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 17155,
          "fieldName": "submittedHidden",
          "template": null,
          "headerText": "Submitted($)",
          "parentFieldId": null,
          "minWidth": null,
          "width": null,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": null,
          "displayOrder": 44,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 17156,
          "fieldName": "acceptedHidden",
          "template": null,
          "headerText": "Won($)",
          "parentFieldId": null,
          "minWidth": null,
          "width": null,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": null,
          "displayOrder": 55,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 17157,
          "fieldName": "rejectedHidden",
          "template": null,
          "headerText": "Lost($)",
          "parentFieldId": null,
          "minWidth": null,
          "width": null,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": null,
          "displayOrder": 65,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        },
        {
          "fieldId": 17158,
          "fieldName": "cancelledHidden",
          "template": null,
          "headerText": "No Deal($)",
          "parentFieldId": null,
          "minWidth": null,
          "width": null,
          "flex": null,
          "headerCssClass": null,
          "fieldCssClass": null,
          "format": null,
          "linkTemplate": null,
          "sortable": null,
          "displayOrder": 75,
          "validatorType": null,
          "validationExpression": null,
          "validationBeginValue": null,
          "validationEndValue": null,
          "fieldDataType": null,
          "useNull": null,
          "show": false,
          "showExcel": true,
          "editable": false,
          "primary": false
        }
      ]
    };

    return data;
  }

  getTableData(): any {
    const data = {
      "storeSummary": [
        {
          "storeNumber": "00",
          "storeName": "Branch00",
          "quoted": 5,
          "openQuote": 4,
          "submitted": 0,
          "approved": 0,
          "accepted": 1,
          "rejected": 0,
          "cancelled": 0,
          "closeRate": 100,
          "sumQuoted": 16180.27,
          "sumOpen": 2533.44,
          "sumSubmitted": 0,
          "sumApproved": 0,
          "sumAccepted": 13646.83,
          "sumRejected": 0,
          "sumCancelled": 0,
          "sort": 1
        },
        {
          "storeNumber": "02",
          "storeName": "Branch02",
          "quoted": 1,
          "openQuote": 1,
          "submitted": 0,
          "approved": 0,
          "accepted": 0,
          "rejected": 0,
          "cancelled": 0,
          "closeRate": 0,
          "sumQuoted": 0,
          "sumOpen": 0,
          "sumSubmitted": 0,
          "sumApproved": 0,
          "sumAccepted": 0,
          "sumRejected": 0,
          "sumCancelled": 0,
          "sort": 1
        },
        {
          "storeNumber": "",
          "storeName": "Total",
          "quoted": 6,
          "openQuote": 5,
          "submitted": 0,
          "approved": 0,
          "accepted": 1,
          "rejected": 0,
          "cancelled": 0,
          "closeRate": 100,
          "sumQuoted": 16180.27,
          "sumOpen": 2533.44,
          "sumSubmitted": 0,
          "sumApproved": 0,
          "sumAccepted": 13646.83,
          "sumRejected": 0,
          "sumCancelled": 0,
          "sort": 2
        }
      ]
    };

    return data;
  }

}
