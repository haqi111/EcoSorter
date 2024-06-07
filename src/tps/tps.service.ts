import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTpsDto, SearchTpsDto, UpdateTpDto } from './dto';
import { PrismaService } from 'nestjs-prisma';
import { Public } from '../common/decorators';
import { Status } from '@prisma/client';
@Injectable()
export class TpsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTps(createTpsDto: CreateTpsDto): Promise<any> {
    try {
      const createdTps = await this.prisma.dataTps.create({
        data: createTpsDto,
      });

      return createdTps;
    } catch (error) {
      throw new Error(`Failed to create TPS: ${error.message}`);
    }
  }

  @Public()
  async getAllTps(): Promise<any[]> {
    try {
      return await this.prisma.dataTps.findMany();
    } catch (error) {
      throw new Error(`Failed to fetch TPS data: ${error.message}`);
    }
  }  

  @Public()
  async getTpsById(id: number): Promise<any> {
    try {
      const user = await this.prisma.dataTps.findUnique({ where: { id: id } });
      if (!user) {
        throw new NotFoundException('TPS not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async updateTps(id: number, updateTpDto: UpdateTpDto): Promise<void> {
    try {
      const existingTps = await this.prisma.dataTps.findUnique({
        where: { id },
      });
      if (!existingTps) {
        throw new NotFoundException('TPS not found');
      }

      await this.prisma.dataTps.update({
        where: { id },
        data: updateTpDto,
      });
    } catch (error) {
      throw new Error(`Failed to update TPS: ${error.message}`);
    }
  }

  async deleteTps(id: number): Promise<boolean> {
    try {
      const existingTps = await this.prisma.dataTps.findUnique({
        where: { id },
      });
      if (!existingTps) {
        throw new NotFoundException('TPS not found');
      }

      await this.prisma.dataTps.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new Error(`Failed to delete TPS: ${error.message}`);
    }
  }
  
async tpsSearch(searchDto: SearchTpsDto): Promise<any[]> {
    const { provinsi, kabupatenKota, status } = searchDto;
    const isStatusKeyword = Object.values(Status).includes(status);

    const tpsList = await this.prisma.dataTps.findMany({
      where: {
        AND: [
          ...(provinsi ? [{ provinsi: { contains: provinsi } }] : []),
          ...(kabupatenKota ? [{ kabupatenKota: { contains: kabupatenKota } }] : []),
          ...(isStatusKeyword ? [{ status: status }] : [])
        ],
      },
    });

    if (tpsList.length === 0) {
      throw new NotFoundException(`No TPS found for the provided search criteria`);
    }

    return tpsList;
  }
}
