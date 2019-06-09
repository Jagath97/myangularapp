import { TestBed, async, inject } from '@angular/core/testing';

import { PlaceorderGuard } from './placeorder.guard';

describe('PlaceorderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceorderGuard]
    });
  });

  it('should ...', inject([PlaceorderGuard], (guard: PlaceorderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
