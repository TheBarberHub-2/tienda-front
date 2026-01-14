import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCrear } from './c-crear';

describe('CCrear', () => {
  let component: CCrear;
  let fixture: ComponentFixture<CCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CCrear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCrear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
