import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CHeaderComponent } from './c-header';

describe('CHeaderComponent', () => {
    let component: CHeaderComponent;
    let fixture: ComponentFixture<CHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CHeaderComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
