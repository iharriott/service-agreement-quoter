import { TestBed } from '@angular/core/testing';

import { QuoteReportsWorkflowByOwnerResolverService } from './quote-reports-workflow-by-owner-resolver.service';

describe('QuoteReportsWorkflowByOwnerService', () => {
  let service: QuoteReportsWorkflowByOwnerResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteReportsWorkflowByOwnerResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
