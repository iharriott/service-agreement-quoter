import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormActionsConfig, User } from './personalize.model';
import {
  SharedFormActionsInputConfig,
  SharedFormActionsOutputConfig,
} from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import { PersonalizeService } from './personalize.service';
import { FieldConfig } from 'shared-components-lib/lib/shared-form/shared/others/model/field.model';
import { FormField } from '../../../shared/models/form-field.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.html',
  styleUrls: ['./personalize.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalizeComponent implements OnInit, OnDestroy {
  /*** Local Variables ***/
  private destroy$: Subject<boolean> = new Subject();
  /*** End of Local Variables ***/

  /*** Child Components ***/
  formActionsConfig: FormActionsConfig | null | undefined;

  /*** End of Child Components ***/

  /**
   * Constructor
   * @param personalizeService
   */
  constructor(private personalizeService: PersonalizeService) {}

  /*** Start of Life Cycle Implementation ***/

  /**
   * Implementation for OnInit
   * @return void
   */
  ngOnInit(): void {
    this.initFormActions();
    this.notifyFormActions();
  }

  /**
   * Implementation for OnDestroy
   * @return void
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /*** End of Life Cycle Implementation ***/

  /*** Start of Public Functions ***/

  /*** End of Public Functions ***/

  /*** Start of Private Functions ***/
  /**
   * Function to init Form Actions component
   * @return void
   * @private
   */
  private initFormActions(): void {
    // FIXME load from service
    this.formActionsConfig = {
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
        this.handleFormActions(event);
      },
    };
  }

  /**
   * Function to handle form actions output
   * @param _event
   * @return void
   * @private
   */
  private handleFormActions(_event: SharedFormActionsOutputConfig): void {
    // FIXME handle form actions logic
    this.saveUser({});
  }

  /**
   * Function to notify form actions component
   * @return void
   * @private
   */
  private notifyFormActions(): void {
    const data: User | undefined | null = this.personalizeService.userData;
    const config: FormField[] | undefined = this.personalizeService.userConfig;
    if (data && config) {
      const fieldConfigs: FieldConfig[] =
        this.personalizeService.transformToFormsConfig(data, config);
      if (fieldConfigs && this.formActionsConfig) {
        if (this.formActionsConfig) {
          this.formActionsConfig.compConfig.options = {
            isShow: true,
            isError: false,
            readonly: false,
          };
          this.formActionsConfig.compConfig.data = {
            ...this.formActionsConfig?.compConfig.data,
            fieldConfig: {
              dynamicFormName: 'PersonalizeComponentForm',
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
        }
      }
    }
  }

  /**
   * Function to save user data
   * @param user
   * @private
   */
  private saveUser(user: User): void {
    this.personalizeService.saveUser(user).pipe(take(1));
  }

  /*** End of Private Functions ***/
}
