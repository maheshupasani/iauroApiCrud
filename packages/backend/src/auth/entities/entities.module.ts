import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { TokenCacheService } from './token-cache/token-cache.service';
import { AuthAggregatesManager } from '../aggregates';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user-entity';
import { TokenCache } from 'src/entities/token-cache-entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TokenCache])],
  providers: [UserService, TokenCacheService],
  exports: [UserService, TokenCacheService],
})
export class AuthEntitiesModule {}
