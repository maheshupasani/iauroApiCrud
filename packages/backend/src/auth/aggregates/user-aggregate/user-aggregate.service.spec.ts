import { Test, TestingModule } from '@nestjs/testing';
import { UserAggregateService } from './user-aggregate.service';

describe('UserAggregateService', () => {
  let service: UserAggregateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAggregateService],
    }).compile();

    service = module.get<UserAggregateService>(UserAggregateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
