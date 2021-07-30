import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import { GridState } from 'shared-components-lib/lib/shared-grid/atom-grid/gridstate.interface';
import { FooterColumns } from 'shared-components-lib';
import { BehaviorSubject, Subject } from 'rxjs';
import { OwnerSummaryRoot } from './models/quote-reports-workflow-by-owner.model';
import { QuoteReportWorkflowService } from './services/quote-report-workflow.service';
import {
  SharedFormActionsInputConfig,
  SharedFormActionsOutputConfig,
} from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import { AppConfig, MockData } from '../quote-list/mock.data';
import { FieldConfig } from 'shared-components-lib/lib/shared-form/shared/others/model/field.model';
import { SharedFormsConfig } from './models/quote-reports-workflow-by-owner.model';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputData: any;
  /*** Child Components ***/
  sharedFilterConfig: SharedFormsConfig | null | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });

  constructor(private quoteReportWorkflowService: QuoteReportWorkflowService) {}

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
    this.gridData = this.quoteReportWorkflowService.gridDefinition;
    this.tableData = this.quoteReportWorkflowService.gridData;
    this.initSharedFormsComponent();
    this.notifySharedFormsComponent();
    console.log(`girdData = ${JSON.stringify(this.gridData)}`);
    console.log(`tableData = ${JSON.stringify(this.tableData?.ownerSummary)}`);

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.ownerSummary,
    });
  }
}
