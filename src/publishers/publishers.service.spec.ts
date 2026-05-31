import { Test, TestingModule } from '@nestjs/testing';
import { PublishersService } from './publishers.service';

describe('PublishersService', () => {
  let service: PublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublisherService],
    }).compile();

    service = module.get<PublisherService>(PublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
