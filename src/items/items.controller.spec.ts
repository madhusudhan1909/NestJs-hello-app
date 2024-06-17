import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service'; // Import ItemsService

describe('Items Controller', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService], // Provide ItemsService here
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more test cases as needed
});
