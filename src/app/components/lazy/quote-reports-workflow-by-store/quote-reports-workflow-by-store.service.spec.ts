import { TestBed } from '@angular/core/testing';

import { QuoteReportsWorkflowByStoreService } from './quote-reports-workflow-by-store.service';

describe('QuoteReportsWorkflowByStoreService', () => {
  let service: QuoteReportsWorkflowByStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteReportsWorkflowByStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
