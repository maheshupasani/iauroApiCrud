import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthAggregateService } from './aggregates/auth-aggregate/auth-aggregate.service';
import { AuthEntitiesModule } from './entities/entities.module';
import { UserController } from './controllers/user/user.controller';
import { UserAggregateService } from './aggregates/user-aggregate/user-aggregate.service';
import { ProductModule } from '../product/product.module';
import { TokenGuard } from './guards/token.guard';
import { AuthAggregatesManager } from './aggregates';

@Module({
  imports: [AuthEntitiesModule],
  controllers: [AuthController, UserController],
  providers: [...AuthAggregatesManager, TokenGuard],
  exports: [...AuthAggregatesManager, AuthEntitiesModule, TokenGuard],
})
export class AuthModule {}
