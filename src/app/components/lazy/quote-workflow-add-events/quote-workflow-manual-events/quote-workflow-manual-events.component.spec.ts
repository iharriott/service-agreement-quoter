import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteWorkflowManualEventsComponent } from './quote-workflow-manual-events.component';

describe('QuoteWorkflowManualEventsComponent', () => {
  let component: QuoteWorkflowManualEventsComponent;
  let fixture: ComponentFixture<QuoteWorkflowManualEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteWorkflowManualEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteWorkflowManualEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
