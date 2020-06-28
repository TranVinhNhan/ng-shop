import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandUpdateModalComponent } from './brand-update-modal.component';

describe('BrandUpdateModalComponent', () => {
  let component: BrandUpdateModalComponent;
  let fixture: ComponentFixture<BrandUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
