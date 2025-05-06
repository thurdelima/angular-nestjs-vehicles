import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

describe('VehiclesService', () => {
  let service: VehiclesService;

  const mockPrismaService = {
    vehicle: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a vehicle', async () => {
    const dto: CreateVehicleDto = {
      plate: 'ABC1234',
      renavam_code: '123456789',
      model: 'Corolla',
      brand: 'Toyota',
      year: 2022,
    };

    const mockVehicle = {
      id: 'uuid',
      ...dto,
      insertedAt: new Date(),
      updatedAt: null,
    };
    mockPrismaService.vehicle.create.mockResolvedValue(mockVehicle);

    const result = await service.create(dto);
    expect(result).toEqual(mockVehicle);
    expect(mockPrismaService.vehicle.create).toHaveBeenCalledWith({
      data: dto,
    });
  });

  it('should return all vehicles', async () => {
    const mockVehicles = [
      {
        id: 'uuid1',
        placa: 'AAA1111',
        renavam_code: '999999',
        model: 'ModelX',
        brand: 'Tesla',
        year: 2023,
        insertedAt: new Date(),
        updatedAt: null,
      },
    ];
    mockPrismaService.vehicle.findMany.mockResolvedValue(mockVehicles);

    const result = await service.findAll();
    expect(result).toEqual(mockVehicles);
  });

  it('should return one vehicle by id', async () => {
    const mockVehicle = {
      id: 'uuid',
      placa: 'BBB2222',
      renavam_code: '888888',
      model: 'Civic',
      brand: 'Honda',
      year: 2021,
      insertedAt: new Date(),
      updatedAt: null,
    };
    mockPrismaService.vehicle.findUnique.mockResolvedValue(mockVehicle);

    const result = await service.findOne('uuid');
    expect(result).toEqual(mockVehicle);
    expect(mockPrismaService.vehicle.findUnique).toHaveBeenCalledWith({
      where: { id: 'uuid' },
    });
  });

  it('should update a vehicle', async () => {
    const dto: UpdateVehicleDto = { model: 'New Model', year: 2024 };
    const updated = {
      id: 'uuid',
      placa: 'CCC3333',
      renavam_code: '777777',
      model: 'New Model',
      brand: 'Ford',
      year: 2024,
      insertedAt: new Date(),
      updatedAt: new Date(),
    };
    mockPrismaService.vehicle.update.mockResolvedValue(updated);

    const result = await service.update('uuid', dto);
    expect(result).toEqual(updated);
  });

  it('should delete a vehicle', async () => {
    const deleted = {
      id: 'uuid',
      placa: 'DDD4444',
      renavam_code: '666666',
      model: 'Uno',
      brand: 'Fiat',
      year: 2018,
      insertedAt: new Date(),
      updatedAt: null,
    };
    mockPrismaService.vehicle.delete.mockResolvedValue(deleted);

    const result = await service.remove('uuid');
    expect(result).toEqual(deleted);
  });
});
