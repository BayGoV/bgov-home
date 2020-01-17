import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenticationHelperGuard } from './authentication-helper.guard';

describe('AuthenticationHelperGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationHelperGuard]
    });
  });

  it('should ...', inject([AuthenticationHelperGuard], (guard: AuthenticationHelperGuard) => {
    expect(guard).toBeTruthy();
  }));
});
