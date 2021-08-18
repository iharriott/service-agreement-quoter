import { TestBed } from '@angular/core/testing';

import { QuoteWorkflowPackageListService } from './quote-workflow-package-list.service';

describe('QuoteWorkflowPackageListService', () => {
  let service: QuoteWorkflowPackageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteWorkflowPackageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
