import { TestBed } from '@angular/core/testing';

import { QuoteReportsWorkflowByStoreResolver } from './quote-reports-workflow-by-store.resolver';

describe('QuoteReportsWorkflowByStoreResolver', () => {
  let resolver: QuoteReportsWorkflowByStoreResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuoteReportsWorkflowByStoreResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
