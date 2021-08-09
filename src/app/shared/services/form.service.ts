import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FieldConfig } from 'shared-components-lib/lib/shared-form/shared/others/model/field.model';
import { FormField } from '../models/form-field.model';
import { SharedFormsConfig } from 'src/app/components/lazy/quote-list/quote-list.model';
import { SharedFormActionsInputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';

@Injectable()
export class FormService {
  sharedFilterConfig: SharedFormsConfig | null | undefined;
  outputData: any;
  constructor(private http: HttpClient) {}

  getConfig(formName: string): Observable<FormField[]> {
    const url = environment.FORM_CONFIG_EP + formName;
    return this.http.get<FormField[]>(url).pipe(
      map((y: FormField[]) => {
        y.forEach((x: FormField) => {
          x.fieldId = x.fieldName;
          // temporarily hardcode dropdowns with userids
          if (x.fieldType === 'select') {
            x.options = [
              {
                optionKey: x.fieldName,
                labelValues: [
                  { label: 'Current User', value: 2737 },
                  { label: 'No Filter', value: 0 },
                  { label: 'Other User', value: 1 },
                ],
              },
            ];
          }
        });
        return y;
      })
    );
  }

  /**
   * FIXME Later will be moved to lib
   * Transform function
   * @return void
   */
  transformToConfig(data: any, configs: FormField[]): FieldConfig[] {
    const fieldConfigs: FieldConfig[] = [];
    if (data && configs && Array.isArray(configs) && configs.length > 0) {
      Object.keys(data).forEach((key: string) => {
        const appConfig: FormField | undefined = configs.find(
          (cfg: FormField) => cfg.fieldName == key
        );
        if (appConfig) {
          const fieldConfig: FieldConfig = {
            key: appConfig.fieldName,
            label: appConfig.fieldLabel,
            sequence: appConfig.displayOrder,
            fieldType: appConfig.fieldType,
            tooltip: appConfig.tooltip,
            info: appConfig.info,
            hint: appConfig.hint,
            readonly: appConfig.readOnly,
            options: appConfig.options,
          };
          fieldConfigs.push(fieldConfig);
        }
      });
    }
    return fieldConfigs;
  }

  /**
   *  Function to initialize form configuration object
   * @return  void
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
      //This property must be removed from the configuration
      compOutput: (): void => {
        console.log('obsolete must be removed');
      },
    };
  }

  /**
   *  Function to fully hydrate the form configuration object
   * data: The default form data
   * config: The form configuration data retrieved from the database. All configuration values must be provided
   * @return  SharedFormsConfig
   */
  notifySharedFormsComponent(
    data: unknown,
    config: FormField[] | undefined
  ): SharedFormsConfig | null | undefined {
    if (data && config) {
      this.initSharedFormsComponent();
      const fieldConfigs: FieldConfig[] = this.transformToConfig(data, config);
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
      }
    }

    return this.sharedFilterConfig;
  }
}
