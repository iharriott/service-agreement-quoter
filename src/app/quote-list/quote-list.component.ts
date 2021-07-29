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
  SharedFormsConfig,
} from './models/quote-list.model';
import {
  SharedFormActionsInputConfig,
  SharedFormActionsOutputConfig,
} from '../../../../angular-shared-components/dist/shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import { FieldConfig } from '../../../../angular-shared-components/dist/shared-components-lib/lib/shared-form/shared/others/model/field.model';
import { AppConfig, AppData, getConfig, getData } from './app.data';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject();
  data: QuoteListResolverData;
  gridData!: DataDefinition | undefined;
  tableData!: QuotesGetQuotesForViewResult | undefined;
  listData$: BehaviorSubject<GridState> = new BehaviorSubject<GridState>({
    isLoaded: false,
    payload: [],
  });
  outputData: any;
  /*** Child Components ***/
  sharedFilterConfig: SharedFormsConfig | null | undefined;

  /*** End of Child Components ***/

  constructor(private route: ActivatedRoute) {
    this.data = this.route.snapshot.data['pageData'];
    this.gridData = this.data.dcfComponentGetComponentForViewResult;
    this.tableData = this.data.quotesGetQuotesForViewResult;

    this.listData$.next({
      isLoaded: true,
      payload: this.tableData?.quotesList,
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    this.initSharedFormsComponent();
    this.prepareData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Function to init this component
   * @return void
   * @private
   */
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
        this.outputData = event.data;
      },
    };
  }

  /**
   * Function to prepare data
   * @return void
   * @private
   */
  private prepareData(): void {
    const data: AppData = getData;
    const config: AppConfig[] = getConfig;

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
