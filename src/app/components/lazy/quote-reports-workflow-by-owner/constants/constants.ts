import {
  QuoteReportsFilter,
  QuoteReportWorkflowParams,
} from '../quote-reports-workflow-by-owner.model';

export abstract class Constants {
  static readonly REPORT_PARAMS: QuoteReportWorkflowParams = {
    languageId: 1,
    viewUserId: 2737,
    mode: 'Edit',
    reportYear: 2018,
    reportMonth: 0,
    ownerUserId: 0,
    division: '%',
    storeNumber: '%',
  };

  static readonly REPORT_FILTERS: QuoteReportsFilter = {
    year: 2018,
    month: '0',
    branch: '%',
    owner: '%',
    status: 63,
  };
}
