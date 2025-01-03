import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSelectComponent } from './range-select.component';

describe('RangeSelectComponent', () => {
  let component: RangeSelectComponent;
  let fixture: ComponentFixture<RangeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
