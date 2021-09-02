import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../entities/product/product.service';
import { UserService } from '../../../auth/entities/user/user.service';
import {
  AddNewProductDto,
  UpdateProductDto,
} from 'src/product/entities/product/product.dto';
import { Product } from 'src/entities/product-entity';

@Injectable()
export class ProductAggregateService {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  listProducts(offset, limit, sort: any, filters: any) {
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

    return this.productService.list(
      offset || 0,
      limit || 10,
      sortQuery,
      filterQuery,
    );
  }

  create(payload: AddNewProductDto, clientRequest: any) {
    return from(
      this.userService.findOne({
        uuid: clientRequest.token.userUuid,
      }),
    ).pipe(
      switchMap((user) => {
        const toDo = new Product();
        Object.assign(toDo, payload);
        toDo.user = user;
        return from(toDo.save());
      }),
    );
  }

  update(payload: UpdateProductDto, clientRequest: any) {
    return from(
      this.productService.findOne({
        uuid: payload.uuid,
      }),
    ).pipe(
      switchMap((toDo) => {
        Object.assign(toDo, payload);
        return from(toDo.save());
      }),
    );
  }

  delete(uuid: string) {
    return from(this.productService.doSoftDelete(uuid));
  }
}
