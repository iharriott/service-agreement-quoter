import { TestBed } from '@angular/core/testing';

import { QuoteReportWorkflowByOwnerService } from './quote-report-workflow-by-owner.service';

describe('QuoteReportWorkflowService', () => {
  let service: QuoteReportWorkflowByOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteReportWorkflowByOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
