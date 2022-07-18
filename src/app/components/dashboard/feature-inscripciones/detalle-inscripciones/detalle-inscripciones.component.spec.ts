import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInscripcionesComponent } from './detalle-inscripciones.component';

xdescribe('DetalleInscripcionesComponent', () => {
  let component: DetalleInscripcionesComponent;
  let fixture: ComponentFixture<DetalleInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleInscripcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
