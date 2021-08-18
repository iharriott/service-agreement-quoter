import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteWorkflowEventsComponent } from './quote-workflow-events.component';

describe('QuoteWorkflowEventsComponent', () => {
  let component: QuoteWorkflowEventsComponent;
  let fixture: ComponentFixture<QuoteWorkflowEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteWorkflowEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteWorkflowEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
