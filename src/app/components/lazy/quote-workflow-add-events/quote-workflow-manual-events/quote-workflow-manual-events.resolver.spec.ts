import { TestBed } from '@angular/core/testing';

import { QuoteWorkflowManualEventsResolver } from './quote-workflow-manual-events.resolver';

describe('QuoteWorkflowManualEventsResolver', () => {
  let resolver: QuoteWorkflowManualEventsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuoteWorkflowManualEventsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
