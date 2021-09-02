import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenCache } from '../../entities/token-cache-entity';
import { TokenCacheService } from '../entities/token-cache/token-cache.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly tokenCacheService: TokenCacheService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const accessToken = this.getAccessToken(req);
    return from(this.tokenCacheService.findOne({ accessToken })).pipe(
      switchMap((cachedToken: TokenCache) => {
        if (
          Math.floor(new Date().getTime() / 1000) < Number(cachedToken.expiry)
        ) {
          req.token = cachedToken;
          return of(true);
        } else return of(false);
      }),
    );
  }

  getAccessToken(request) {
    if (!request.headers.authorization) {
      if (!request.query.access_token) return null;
    }
    return (
      request.query.access_token ||
      request.headers.authorization.split(' ')[1] ||
      null
    );
  }
}
