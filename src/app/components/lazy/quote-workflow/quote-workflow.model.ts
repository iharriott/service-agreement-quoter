import { Subject } from 'rxjs';
import { SharedFormActionsInputConfig } from 'shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';

export interface QuoteList {
  quoteId: number;
  revision: number;
  quoteNumber: string;
  quoteDate: Date;
  customerNumber: string;
  customerName: string;
  ownerFirstName: string;
  ownerLastName: string;
  division?: string;
  quoteStatus: string;
  quoteDescription: string;
  quoteTotal: number;
  quoteTypeDescription: string;
}

export interface QuoteListRoot {
  quoteList: QuoteList[];
}

export interface SharedFormsConfig {
  compConfig: SharedFormActionsInputConfig;
  inputChange: Subject<SharedFormActionsInputConfig>;
}
