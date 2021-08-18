import { TestBed } from '@angular/core/testing';

import { QuoteWorkflowEventsService } from './quote-workflow-events.service';

describe('QuoteWorkflowEventsService', () => {
  let service: QuoteWorkflowEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteWorkflowEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
