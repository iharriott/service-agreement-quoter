import { Injectable } from '@angular/core';
import {
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from '../../components/lazy/quote-reports-workflow-by-owner/quote-reports-workflow-by-owner.model';
import { SharedFormActionsOutputConfig } from '../../../../../angular-shared-components/dist/shared-components-lib/lib/shared-form/shared-form-actions/shared-form-actions.model';
import { Constants } from '../../components/lazy/quote-reports-workflow-by-owner/constants/constants';

@Injectable()
export class WorkflowReportFilterService {
  reportParams: QuoteReportWorkflowParams = Constants.REPORT_PARAMS;
  reportFilter: QuoteReportsFilter = Constants.REPORT_FILTERS;

  getReportFilterParams(
    eventData: SharedFormActionsOutputConfig
  ): QuoteReportWorkflowParams {
    this.reportParams.viewUserId = eventData.data[0].owner;
    this.reportParams.reportYear = eventData.data[0].year;
    this.reportParams.reportMonth = eventData.data[0].month;
    this.reportParams.ownerUserId = eventData.data[0].owner;
    this.reportParams.storeNumber = eventData.data[0].branch;

    return this.reportParams;
  }

  getReportFilter(
    eventData: SharedFormActionsOutputConfig
  ): QuoteReportsFilter {
    this.reportFilter.year = eventData.data[0].year;
    this.reportFilter.month = eventData.data[0].month;
    this.reportFilter.branch = eventData.data[0].branch;
    this.reportFilter.owner = eventData.data[0].owner;
    this.reportFilter.status = eventData.data[0].status;

    return this.reportFilter;
  }

  getInitialReportFilter(): QuoteReportsFilter {
    return this.reportFilter;
  }

  getInitialReportParams(): QuoteReportWorkflowParams {
    return this.reportParams;
  }
}
