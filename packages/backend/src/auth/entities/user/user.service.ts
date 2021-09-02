import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user-entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async list(skip = 0, take = 10, sort = {}, filters = {}) {
    for (const key of Object.keys(sort)) {
      sort[key] = sort[key].toUpperCase();
      if (!sort[key]) {
        delete sort[key];
      }
    }
    const where = filters ? this.getFilterQuery(filters) : {};
    const [results, length] = await this.userRepository.findAndCount({
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

  findOne(query) {
    return this.userRepository.findOne(query);
  }

  doSoftDelete(uuid: string) {
    return this.userRepository.softDelete(uuid);
  }
}
