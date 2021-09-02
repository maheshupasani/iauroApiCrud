import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UpdateUserDto, UserListDto } from 'src/auth/entities/user/user.dto';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { TokenGuard } from 'src/auth/guards/token.guard';
import { AccountTypes } from 'src/constant/enum';
import { UserAggregateService } from '../../aggregates/user-aggregate/user-aggregate.service';

@Controller('user')
export class UserController {
  constructor(private readonly userAggregateService: UserAggregateService) {}

  @Get('')
  @UseGuards(TokenGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async listApplication(@Query() query: UserListDto) {
    const { offset, limit, sort, filters } = query;
    return await this.userAggregateService.listUser(
      Number(offset),
      Number(limit),
      sort,
      filters,
    );
  }

  @Put('')
  @Roles(AccountTypes.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(TokenGuard, RoleGuard)
  async update(@Body() payload: UpdateUserDto, @Req() req) {
    return this.userAggregateService.update(payload, req).toPromise();
  }

  @Delete(':uuid')
  @Roles(AccountTypes.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(TokenGuard, RoleGuard)
  async delete(@Param('uuid') uuid: string) {
    return this.userAggregateService.delete(uuid).toPromise();
  }
}
