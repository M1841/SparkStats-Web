import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPlaylistDetailsComponent } from './item-playlist-details.component';

describe('ItemPlaylistDetailsComponent', () => {
  let component: ItemPlaylistDetailsComponent;
  let fixture: ComponentFixture<ItemPlaylistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPlaylistDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemPlaylistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
