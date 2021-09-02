import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UpdateUserDto } from 'src/auth/entities/user/user.dto';
import { UserService } from 'src/auth/entities/user/user.service';

@Injectable()
export class UserAggregateService {
  constructor(private readonly userService: UserService) {}

  listUser(offset, limit, sort: any, filters: any) {
    let sortQuery = {};
    let filterQuery = {};
    try {
      sortQuery = JSON.parse(sort);
    } catch (error) {
      sortQuery = { createdOn: 'DESC' };
    }

    try {
      filterQuery = JSON.parse(filters);
    } catch (error) {
      filterQuery = {};
    }

    return this.userService.list(
      offset || 0,
      limit || 10,
      sortQuery,
      filterQuery,
    );
  }

  update(payload: UpdateUserDto, clientRequest: any) {
    return from(
      this.userService.findOne({
        uuid: payload.uuid,
      }),
    ).pipe(
      switchMap((user) => {
        Object.assign(user, payload);
        return from(user.save());
      }),
    );
  }

  delete(uuid: string) {
    return from(this.userService.doSoftDelete(uuid));
  }
}
