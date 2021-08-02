import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteReportsWorkflowByStoreComponent } from './quote-reports-workflow-by-store.component';

describe('QuoteReportsWorkflowByStoreComponent', () => {
  let component: QuoteReportsWorkflowByStoreComponent;
  let fixture: ComponentFixture<QuoteReportsWorkflowByStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteReportsWorkflowByStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteReportsWorkflowByStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
