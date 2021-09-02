import { Test, TestingModule } from '@nestjs/testing';
import { ProductAggregateService } from './product-aggregate.service';

describe('ProductAggregateService', () => {
  let service: ProductAggregateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductAggregateService],
    }).compile();

    service = module.get<ProductAggregateService>(ProductAggregateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
