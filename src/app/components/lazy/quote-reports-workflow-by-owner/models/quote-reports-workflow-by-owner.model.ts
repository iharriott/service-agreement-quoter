import { Subject } from 'rxjs';
import { DataDefinition } from 'shared-components-lib/lib/shared-grid/atom-grid/atom-grid-data.interface';
import {
  SharedFormActionsInputConfig,
  SharedFormActionsOutputConfig,
} from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';

export interface Division {
  division: string;
  divisionName: string;
}

export interface Store {
  storeNumber: string;
  storeName: string;
}

export interface Owner {
  salesRepUserId: number;
  firstName: string;
  lastName: string;
}

export interface Filters {
  division: Division[];
  store: Store[];
  owner: Owner[];
}

export interface OwnerSummary {
  salesRepUserId?: number;
  salesrepName: string;
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

export interface OwnerSummaryExtended {
  filters: Filters;
  ownerSummary: OwnerSummary[];
}

export interface OwnerSummaryRoot {
  ownerSummary: OwnerSummary[];
}

export interface QuoteReportsWorkflowResolverData {
  dcfColumnDefiniton?: DataDefinition;
  ownerSummary?: OwnerSummaryRoot;
}

export interface QuoteReportWorkflowParams {
  languageId: number;
  viewUserId: number;
  mode: string;
  reportYear: number;
  reportMonth: number;
  ownerUserId: number;
  division: string;
  storeNumber: string;
}

export interface SharedFormsConfig {
  compConfig: SharedFormActionsInputConfig;
  inputChange: Subject<SharedFormActionsInputConfig>;
  compOutput: (event: SharedFormActionsOutputConfig) => void;
}
