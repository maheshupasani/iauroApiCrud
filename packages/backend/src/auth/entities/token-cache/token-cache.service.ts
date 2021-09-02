import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenCache } from '../../../entities/token-cache-entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenCacheService {
  constructor(
    @InjectRepository(TokenCache)
    private readonly tokenCacheRepository: Repository<TokenCache>,
  ) {}

  findOne(query) {
    return this.tokenCacheRepository.findOne(query);
  }
}
