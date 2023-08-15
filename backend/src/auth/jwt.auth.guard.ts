import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Récupérer la route en cours
    const route = context.getHandler();
    console.log(route.name);
    // Vérifier si la route est la route de connexion
    if (route.name === 'logIn') {
      return true; // Autoriser l'accès non authentifié à la route de connexion
    }

    return super.canActivate(context);
  }
}
