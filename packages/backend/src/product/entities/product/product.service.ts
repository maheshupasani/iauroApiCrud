import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from '../../../entities/product-entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async list(skip = 0, take = 10, sort = {}, filters = {}) {
    for (const key of Object.keys(sort)) {
      sort[key] = sort[key].toUpperCase();
      if (!sort[key]) {
        delete sort[key];
      }
    }
    const where = filters ? this.getFilterQuery(filters) : {};
    const [results, length] = await this.productRepository.findAndCount({
      skip,
      take,
      where,
      order: sort,
    });

    return {
      docs: results || [],
      length,
      offset: skip,
    };
  }

  getFilterQuery(query) {
    const keys = Object.keys(query);
    keys.forEach((key) => {
      if (query[key]) {
        if (key === 'status' && query[key] === 'All') delete query[key];
        if (key === 'status') query[key];
        else query[key] = Like(`%${query[key]}%`);
      } else delete query[key];
    });
    return query;
  }

  find(query) {
    return this.productRepository.find(query);
  }

  findOne(query) {
    return this.productRepository.findOne(query);
  }

  doSoftDelete(uuid: string) {
    return this.productRepository.softDelete(uuid);
  }
}
