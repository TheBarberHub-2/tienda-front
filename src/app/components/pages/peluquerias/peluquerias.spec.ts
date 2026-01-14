import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Peluquerias } from './peluquerias';

describe('Peluquerias', () => {
  let component: Peluquerias;
  let fixture: ComponentFixture<Peluquerias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Peluquerias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Peluquerias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
