import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const route = context.getHandler();
    if (route.name === 'logIn') {
      return true;
    }

    return super.canActivate(context);
  }
}