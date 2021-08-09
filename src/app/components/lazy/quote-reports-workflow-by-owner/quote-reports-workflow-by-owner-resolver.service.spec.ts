import { TestBed } from '@angular/core/testing';

import { QuoteReportsWorkflowByOwnerResolver } from './quote-reports-workflow-by-owner-resolver';

describe('QuoteReportsWorkflowByOwnerService', () => {
  let service: QuoteReportsWorkflowByOwnerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteReportsWorkflowByOwnerResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
