import { TestBed } from '@angular/core/testing';

import { QuoteWorkflowService } from './quote-workflow.service';

describe('QuoteWorkflowService', () => {
  let service: QuoteWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
