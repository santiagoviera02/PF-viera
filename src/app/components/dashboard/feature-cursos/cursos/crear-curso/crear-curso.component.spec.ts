import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCursoComponent } from './crear-curso.component';

xdescribe('CrearCursoComponent', () => {
  let component: CrearCursoComponent;
  let fixture: ComponentFixture<CrearCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearCursoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
