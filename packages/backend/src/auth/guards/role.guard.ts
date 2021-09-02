import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { AccountTypes } from 'src/constant/enum';
import { TokenCache } from 'src/entities/token-cache-entity';
import { ROLES } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES, context.getHandler());
    if (!roles) {
      return of(true);
    }
    const request = context.switchToHttp().getRequest();
    const token: TokenCache = request.token;
    if (token.role === AccountTypes.ADMIN) return of(true);
    for (const role of roles) {
      if (token.role === role) return of(true);
    }

    return of(false);
  }
}
