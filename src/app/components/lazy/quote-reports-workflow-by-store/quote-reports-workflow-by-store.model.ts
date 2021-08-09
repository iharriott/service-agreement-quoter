import { Subject } from 'rxjs';
import {
  SharedFormActionsInputConfig,
  SharedFormActionsOutputConfig,
} from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';

export interface StoreSummary {
  storeNumber: string;
  storeName: string;
  quoted: number;
  openQuote: number;
  submitted: number;
  approved: number;
  accepted: number;
  rejected: number;
  cancelled: number;
  closeRate: number;
  sumQuoted: number;
  sumOpen: number;
  sumSubmitted: number;
  sumApproved: number;
  sumAccepted: number;
  sumRejected: number;
  sumCancelled: number;
  sort: number;
}

export interface StoreSummaryRoot {
  storeSummary: StoreSummary[];
}

export interface SharedFormsConfig {
  compConfig: SharedFormActionsInputConfig;
  inputChange: Subject<SharedFormActionsInputConfig>;
  compOutput: (event: SharedFormActionsOutputConfig) => void;
}
