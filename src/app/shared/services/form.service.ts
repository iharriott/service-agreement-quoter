import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CL1_1, environment } from '../../../environments/environment';
import {
  FieldConfig,
  LabelValue,
  OptionObject,
} from 'shared-components-lib/lib/shared-form/shared/others/model/field.model';
import { FormField } from '../models/form-field.model';
//TODO must be replaced by a type from the shared components
import { SharedFormsConfig } from 'src/app/components/lazy/quote-workflow/quote-workflow.model';
import { SharedFormActionsInputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';

interface FormSource {
  fieldSource: string;
  endpoint: string;
  value: string;
  label: string;
  options?: LabelValue[];
}
interface FormConfiguration {
  fields: FormField[];
  sources: FormSource[];
}

@Injectable()
export class FormService {
  constructor(private http: HttpClient) {}
  dropdownValues: {
    fieldSource: string;
    data: OptionObject[];
  }[] = [];

  /**
   * get all fields and their data for the shared form
   * @param formName name of the form - SELECT * FROM dbo.DCF_Form_Field
   * @returns Form configuration to be passed into shared form component
   */
  getConfig(formName: string): Observable<FormField[]> {
    const url = environment.FORM_CONFIG_EP + formName;
    let fields: FormField[] = [];
    return this.http.get<FormConfiguration>(url).pipe(
      map((data) => {
        fields = data.fields;
        const sources: FormSource[] = data.sources;
        return sources;
      }),
      switchMap((sources) => {
        return this.populateAllOptions(sources);
      }),
      map((sources) => {
        this.populateFields(fields, sources);
        return fields;
      })
    );
  }

  populateFields(fields: FormField[], sources: FormSource[]): FormField[] {
    return fields.map((field) => {
      if (field.source) {
        field.options = [
          {
            optionKey: field.fieldName,
            labelValues:
              sources.find((source) => source.fieldSource === field.source)
                ?.options || [],
          },
        ];
      }
      return field;
    });
  }

  /**
   * forkJoin of each field getting their data
   * @param form configuration from getConfig to be manipulated
   * @returns the form configuration with options added
   */
  private populateAllOptions(sources: FormSource[]): Observable<any> {
    //debugger;
    if (!sources.length) {
      return of([]);
    }
    return forkJoin(
      sources.map((source) => {
        return this.getOptions(source);
      })
    );
  }

  /**
   * get options for a field
   * @param field field that we are going to add options to
   * @returns field, with options added
   */
  private getOptions(source: FormSource): Observable<FormSource> {
    const url = CL1_1 + source.endpoint;
    return this.http.get<any>(url).pipe(
      take(1),
      map((data) => {
        if (!Array.isArray(data)) {
          // for data coming back inside of a pagination object
          data = data.content;
        }
        const labelValues: LabelValue[] = data.map((obj: any) => {
          return { value: obj[source.value], label: obj[source.label] };
        });
        source.options = labelValues;
        return source;
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
   * sharedFilterConfigInit: Initial form configuration data
   * @return  void
   */
  initSharedFormsComponent(
    sharedFilterConfigInit: SharedFormsConfig | null | undefined
  ): SharedFormsConfig {
    sharedFilterConfigInit = {
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
    };
    return sharedFilterConfigInit;
  }

  /**
   *  Function to fully hydrate the form configuration object
   * data: The default form data
   * config: The form configuration data retrieved from the database. All configuration values must be provided
   * * sharedFilterConfigInit: Initial form configuration data
   * @return  SharedFormsConfig
   */
  notifySharedFormsComponent(
    data: unknown,
    config: FormField[] | undefined,
    sharedFilterConfig: SharedFormsConfig | null | undefined
  ): SharedFormsConfig | null | undefined {
    let sharedFilterConfigComplete: SharedFormsConfig | null | undefined;
    if (data && config) {
      sharedFilterConfigComplete =
        this.initSharedFormsComponent(sharedFilterConfig);
      const fieldConfigs: FieldConfig[] = this.transformToConfig(data, config);
      if (sharedFilterConfigComplete) {
        sharedFilterConfigComplete.compConfig.options = {
          isShow: true,
          isError: false,
          readonly: false,
        };
        sharedFilterConfigComplete.compConfig.data = {
          ...sharedFilterConfigComplete?.compConfig.data,
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

    return sharedFilterConfigComplete;
  }
}
