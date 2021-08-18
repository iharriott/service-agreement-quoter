import { TestBed } from '@angular/core/testing';

import { QuoteWorkflowManualEventsService } from './quote-workflow-manual-events.service';

describe('QuoteWorkflowManualEventsService', () => {
  let service: QuoteWorkflowManualEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteWorkflowManualEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
