import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategComponent } from './addcateg.component';

describe('AddcategComponent', () => {
  let component: AddcategComponent;
  let fixture: ComponentFixture<AddcategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcategComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
