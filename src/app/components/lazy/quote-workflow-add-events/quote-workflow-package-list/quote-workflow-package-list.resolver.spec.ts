import { TestBed } from '@angular/core/testing';

import { QuoteWorkflowPackageListResolver } from './quote-workflow-package-list.resolver';

describe('QuoteWorkflowPackageListResolver', () => {
  let resolver: QuoteWorkflowPackageListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuoteWorkflowPackageListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
