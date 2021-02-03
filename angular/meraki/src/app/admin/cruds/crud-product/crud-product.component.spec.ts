import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProductComponent } from './crud-product.component';

describe('CrudProductComponent', () => {
  let component: CrudProductComponent;
  let fixture: ComponentFixture<CrudProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
