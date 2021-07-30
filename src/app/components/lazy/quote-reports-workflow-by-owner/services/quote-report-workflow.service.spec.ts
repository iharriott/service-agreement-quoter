import { TestBed } from '@angular/core/testing';

import { QuoteReportWorkflowService } from './quote-report-workflow.service';

describe('QuoteReportWorkflowService', () => {
  let service: QuoteReportWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteReportWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
