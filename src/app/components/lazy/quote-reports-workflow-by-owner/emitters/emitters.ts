import { EventEmitter } from '@angular/core';

import {
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from '../quote-reports-workflow-by-owner.model';
import { Constants } from '../constants/constants';

export class Emitters {
  static _reportParams: QuoteReportWorkflowParams = Constants.REPORT_PARAMS;
  static _reportFilter: QuoteReportsFilter = Constants.REPORT_FILTERS;

  static reportFilterEmitter = new EventEmitter<QuoteReportsFilter>();
  static reportParamsEmitter = new EventEmitter<QuoteReportWorkflowParams>();

  static set reportFilter(filter: QuoteReportsFilter) {
    this._reportFilter = filter;
    this.reportFilterEmitter.emit(filter);
  }

  static get reportFilter(): QuoteReportsFilter {
    return this._reportFilter;
  }

  static set reportParams(params: QuoteReportWorkflowParams) {
    this._reportParams = params;
    this.reportParamsEmitter.emit(params);
  }

  static get reportParams(): QuoteReportWorkflowParams {
    return this._reportParams;
  }
}
