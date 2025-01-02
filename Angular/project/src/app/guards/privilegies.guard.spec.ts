import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { privilegiesGuard } from './privilegies.guard';

describe('privilegiesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => privilegiesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
