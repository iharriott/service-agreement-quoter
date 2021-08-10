import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteWorkflowComponent } from './quote-workflow.component';

describe('QuoteWorkflowComponent', () => {
  let component: QuoteWorkflowComponent;
  let fixture: ComponentFixture<QuoteWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
