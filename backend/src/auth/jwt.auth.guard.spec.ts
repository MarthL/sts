import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/jwt.auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CanActivate } from '@nestjs/common';

class FakeAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    return true;
  }
}

jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: () => true,
  })),
}));

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if canActivate is called', () => {
    const context = {
      getHandler: () => ({ name: 'notLogIn' }),
      switchToHttp: () => ({
        getRequest: () => ({}),
        getResponse: () => ({}),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBe(true);
  });
});
