import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from '@prisma/client';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVehicleDto): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Vehicle[]> {
    try {
      return await this.prisma.vehicle.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Vehicle | null> {
    try {
      return await this.prisma.vehicle.findUnique({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UpdateVehicleDto): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
