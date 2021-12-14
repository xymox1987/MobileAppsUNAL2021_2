import { TestBed } from '@angular/core/testing';

import { RealTimePlayerService } from './real-time-player.service';

describe('RealTimePlayerService', () => {
  let service: RealTimePlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimePlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
