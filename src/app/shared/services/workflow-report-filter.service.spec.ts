import { TestBed } from '@angular/core/testing';

import { WorkflowReportFilterService } from './workflow-report-filter.service';

describe('WorkflowReportFilterService', () => {
  let service: WorkflowReportFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowReportFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
