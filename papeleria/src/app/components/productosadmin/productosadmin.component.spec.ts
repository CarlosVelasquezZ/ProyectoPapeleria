import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosadminComponent } from './productosadmin.component';

describe('ProductosadminComponent', () => {
  let component: ProductosadminComponent;
  let fixture: ComponentFixture<ProductosadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
