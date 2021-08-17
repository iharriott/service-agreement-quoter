import { TestBed } from '@angular/core/testing';

import { QuoteReportsWorkflowByOwnerService } from './quote-reports-workflow-by-owner.service';

describe('QuoteReportsWorkflowByOwnerService', () => {
  let service: QuoteReportsWorkflowByOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteReportsWorkflowByOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
