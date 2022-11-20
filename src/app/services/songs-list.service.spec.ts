import { TestBed } from '@angular/core/testing';

import { SongsListService } from './songs-list.service';

describe('SongsListService', () => {
  let service: SongsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
