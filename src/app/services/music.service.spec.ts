import { TestBed } from '@angular/core/testing';

import { MusicService } from './music.service';
import { HttpClientModule } from '@angular/common/http';

describe('MusicService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
  );

  it('should be created', () => {
    const service: MusicService = TestBed.get(MusicService);
    expect(service).toBeTruthy();
  });
});
