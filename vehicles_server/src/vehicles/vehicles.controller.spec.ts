import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let service: typeof mockVehiclesService;

  const mockVehiclesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        {
          provide: VehiclesService,
          useValue: mockVehiclesService,
        },
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    service = mockVehiclesService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a vehicle', async () => {
    const dto: CreateVehicleDto = {
      plate: 'ABC1234',
      renavam_code: '123456789',
      model: 'Model S',
      brand: 'Tesla',
      year: 2021,
    };
    const expected = {
      id: '1',
      ...dto,
      insertedAt: new Date(),
      updatedAt: null,
    };

    service.create.mockResolvedValue(expected);

    const result = await controller.create(dto);
    expect(result).toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all vehicles', async () => {
    const expected = [
      { id: '1', plate: 'ABC1234' },
      { id: '2', plate: 'XYZ5678' },
    ];

    service.findAll.mockResolvedValue(expected);

    const result = await controller.findAll();
    expect(result).toEqual(expected);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one vehicle by id', async () => {
    const expected = { id: '1', plate: 'ABC1234' };
    service.findOne.mockResolvedValue(expected);

    const result = await controller.findOne('1');
    expect(result).toEqual(expected);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a vehicle by id', async () => {
    const dto: UpdateVehicleDto = {
      plate: 'NEW1234',
      model: 'Model 3',
    };
    const expected = { id: '1', ...dto, updatedAt: new Date() };

    service.update.mockResolvedValue(expected);

    const result = await controller.update('1', dto);
    expect(result).toEqual(expected);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should delete a vehicle by id', async () => {
    const expected = { message: 'Vehicle removed', id: '1' };
    service.remove.mockResolvedValue(expected);

    const result = await controller.remove('1');
    expect(result).toEqual(expected);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
