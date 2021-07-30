import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteReportsWorkflowByOwnerComponent } from './quote-reports-workflow-by-owner.component';

describe('QuoteReportsWorkflowByOwnerComponent', () => {
  let component: QuoteReportsWorkflowByOwnerComponent;
  let fixture: ComponentFixture<QuoteReportsWorkflowByOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteReportsWorkflowByOwnerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteReportsWorkflowByOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
