import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandImageModalComponent } from './brand-image-modal.component';

describe('BrandImageModalComponent', () => {
  let component: BrandImageModalComponent;
  let fixture: ComponentFixture<BrandImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
