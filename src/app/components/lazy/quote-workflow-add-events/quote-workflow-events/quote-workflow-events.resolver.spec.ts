import { TestBed } from '@angular/core/testing';

import { QuoteWorkflowEventsResolver } from './quote-workflow-events.resolver';

describe('QuoteWorkflowEventsResolver', () => {
  let resolver: QuoteWorkflowEventsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuoteWorkflowEventsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
