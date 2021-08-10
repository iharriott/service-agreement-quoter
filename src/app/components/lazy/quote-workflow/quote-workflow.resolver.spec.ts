import { TestBed } from '@angular/core/testing';

import { QuoteWorkflowResolver } from './quote-workflow.resolver';

describe('QuoteWorkflowResolver', () => {
  let resolver: QuoteWorkflowResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuoteWorkflowResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
