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
import { RoleGuard } from 'src/auth/guards/role.guard';
import { TokenGuard } from 'src/auth/guards/token.guard';
import {
  AddNewProductDto,
  ProductListDto,
  UpdateProductDto,
} from 'src/product/entities/product/product.dto';
import { ProductAggregateService } from '../../aggregates/product-aggregate/product-aggregate.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productAggregateService: ProductAggregateService,
  ) {}

  @Get('')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async listProducts(@Query() query: ProductListDto) {
    const { offset, limit, sort, filters } = query;
    return await this.productAggregateService.listProducts(
      Number(offset),
      Number(limit),
      sort,
      filters,
    );
  }

  @Post('')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(TokenGuard, RoleGuard)
  async create(@Body() payload: AddNewProductDto, @Req() req) {
    req;
    return this.productAggregateService.create(payload, req).toPromise();
  }

  @Put('')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(TokenGuard, RoleGuard)
  async update(@Body() payload: UpdateProductDto, @Req() req) {
    return this.productAggregateService.update(payload, req).toPromise();
  }

  @Delete(':uuid')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(TokenGuard, RoleGuard)
  async delete(@Param('uuid') uuid: string) {
    return this.productAggregateService.delete(uuid).toPromise();
  }
}
