import { Module } from '@nestjs/common';
import { ProductEntitiesModule } from './entities/entities.module';
import { ProductController } from './controllers/product/product.controller';
import { ProductAggregateService } from './aggregates/product-aggregate/product-aggregate.service';
import { AuthModule } from '../auth/auth.module';
import { ProductAggregatesManager } from './aggregates';

@Module({
  imports: [ProductEntitiesModule, AuthModule],
  controllers: [ProductController],
  providers: [...ProductAggregatesManager],
  exports: [...ProductAggregatesManager, ProductEntitiesModule],
})
export class ProductModule {}
