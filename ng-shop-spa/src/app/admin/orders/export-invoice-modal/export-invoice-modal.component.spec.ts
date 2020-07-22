import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportInvoiceModalComponent } from './export-invoice-modal.component';

describe('ExportInvoiceModalComponent', () => {
  let component: ExportInvoiceModalComponent;
  let fixture: ComponentFixture<ExportInvoiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportInvoiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportInvoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
