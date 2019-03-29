import { TestBed } from '@angular/core/testing';

import { ArtistService } from './artist.service';
import { HttpClientModule } from '@angular/common/http';

describe('ArtistService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: ArtistService = TestBed.get(ArtistService);
    expect(service).toBeTruthy();
  });
});
