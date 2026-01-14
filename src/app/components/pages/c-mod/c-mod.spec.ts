import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMod } from './c-mod';

describe('CMod', () => {
  let component: CMod;
  let fixture: ComponentFixture<CMod>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMod]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMod);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
