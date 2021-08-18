import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteWorkflowPackageListComponent } from './quote-workflow-package-list.component';

describe('QuoteWorkflowPackageListComponent', () => {
  let component: QuoteWorkflowPackageListComponent;
  let fixture: ComponentFixture<QuoteWorkflowPackageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteWorkflowPackageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteWorkflowPackageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
