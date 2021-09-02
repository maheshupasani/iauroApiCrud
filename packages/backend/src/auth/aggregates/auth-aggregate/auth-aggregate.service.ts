import { Injectable } from '@nestjs/common';
import { from, of, throwError } from 'rxjs';
import { TokenCacheService } from '../../entities/token-cache/token-cache.service';
import { UserService } from '../../entities/user/user.service';
import { User } from '../../../entities/user-entity';
import {
  LoginUserDto,
  RegisterUserDto,
} from '../../../auth/entities/user/user.dto';
import { switchMap } from 'rxjs/operators';
import { TokenCache } from '../../../entities/token-cache-entity';
import {
  EXPIRY_DURATION_IN_SECONDS,
  SET_TOKEN_EXPIRED,
} from '../../../constant/app-strings';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AccountTypes } from 'src/constant/enum';
import { BadRequestException } from '@nestjs/common';
import { ONLY_ONE_ADMIN_ALLOWED } from 'src/constant/error-message';

@Injectable()
export class AuthAggregateService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenCacheService: TokenCacheService,
  ) {}

  registerUser(payload: RegisterUserDto) {
    if (payload.role === AccountTypes.ADMIN) {
      return from(this.userService.findOne({ role: AccountTypes.ADMIN })).pipe(
        switchMap((admin) => {
          if (admin)
            return throwError(new BadRequestException(ONLY_ONE_ADMIN_ALLOWED));
          return this.createUser(payload);
        }),
      );
    }
  }

  createUser(payload: RegisterUserDto) {
    const user = new User();
    return from(bcrypt.hash(payload.password, 10)).pipe(
      switchMap((hashedPassword: string) => {
        payload.password = hashedPassword;
        Object.assign(user, payload);
        user.save().then();
        return of({
          status: true,
          message: `${payload.role} has been registered successful.Please login`,
        });
      }),
    );
  }

  login(payload: LoginUserDto) {
    return from(
      this.userService.findOne({
        email: payload.email,
      }),
    ).pipe(
      switchMap((user) => {
        return from(bcrypt.compare(payload.password, user.password)).pipe(
          switchMap((passwordMatched) => {
            const token = jwt.sign({ loggedInOn: new Date() }, 'To Do List');
            const tokenCache = new TokenCache();
            tokenCache.userUuid = user.uuid;
            tokenCache.expiry = (
              Date.now() / 1000 +
              Number(EXPIRY_DURATION_IN_SECONDS)
            ).toString(); // 1500 in seconds
            tokenCache.token = token;
            tokenCache.save().then();
            return of({
              token: tokenCache.token,
            });
          }),
        );
      }),
    );
  }

  logout(clientRequest) {
    return from(
      this.tokenCacheService.findOne({
        token: clientRequest.headers.authorization.split(' ')[1],
      }),
    ).pipe(
      switchMap((tokenCache) => {
        tokenCache.expiry = (
          Date.now() / 1000 -
          Number(SET_TOKEN_EXPIRED)
        ).toString();
        tokenCache.save().then();
        return of({
          loggedOut: true,
        });
      }),
    );
  }
}
