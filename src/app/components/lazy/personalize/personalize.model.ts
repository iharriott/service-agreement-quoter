import { Subject } from 'rxjs';
import {
  SharedFormActionsInputConfig,
  SharedFormActionsOutputConfig,
} from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';

// FIXME this is a temp data model
export interface User {
  branch?: string;
  phoneNumber?: string;
}

export interface FormActionsConfig {
  compConfig: SharedFormActionsInputConfig;
  inputChange: Subject<SharedFormActionsInputConfig>;
  compOutput: (event: SharedFormActionsOutputConfig) => void;
  mode?: string;
}
