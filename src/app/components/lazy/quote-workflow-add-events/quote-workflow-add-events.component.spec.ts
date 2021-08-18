import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteWorkflowAddEventsComponent } from './quote-workflow-add-events.component';

describe('QuoteWorkflowAddEventsComponent', () => {
  let component: QuoteWorkflowAddEventsComponent;
  let fixture: ComponentFixture<QuoteWorkflowAddEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteWorkflowAddEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteWorkflowAddEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
