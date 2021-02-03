import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCategoriaComponent } from './crud-categoria.component';

describe('CrudCategoriaComponent', () => {
  let component: CrudCategoriaComponent;
  let fixture: ComponentFixture<CrudCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
