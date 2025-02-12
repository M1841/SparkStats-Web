import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSubitemsComponent } from './item-subitems.component';

describe('ItemSubitemsComponent', () => {
  let component: ItemSubitemsComponent;
  let fixture: ComponentFixture<ItemSubitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSubitemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSubitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
