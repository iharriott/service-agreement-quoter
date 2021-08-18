import { Subject } from 'rxjs';
import { SharedFormActionsInputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';

export interface PackageList {
  packageId: number;
  packageName: string;
  description: string;
  events: number;
  occurences: number;
  warnings: number;
}

export interface PackageListRoot {
  packageList: PackageList[];
}

export interface SharedFormsConfig {
  compConfig: SharedFormActionsInputConfig;
  inputChange: Subject<SharedFormActionsInputConfig>;
}