import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Put, Query } from '@nestjs/common';
import { TpsService } from './tps.service';
import { CreateTpsDto } from './dto/create-tp.dto';
import { UpdateTpDto } from './dto/update-tp.dto';
import { Public } from 'src/common/decorators';
import { SearchTpsDto } from './dto';

interface TpsSearchResult {
  status_code: number;
  message: string;
  data: any[];
}

@Controller('tps')
export class TpsController {
  constructor(private readonly tpsService: TpsService) {}

  @Post('/create-tps/')
  async create(@Body() createTpDto: CreateTpsDto) {
    try {
      const createdTps = await this.tpsService.createTps(createTpDto);
      return {
        status_code: HttpStatus.CREATED,
        message: 'TPS created successfully',
        data: createdTps,
      };
    } catch (error) {
      throw new HttpException(`Failed to create TPS: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Public()
  @Get('/list-tps/')
  async findAll() {
    try {
      const tpsList = await this.tpsService.getAllTps();
      return {
        status_code: HttpStatus.OK,
        message: 'TPS list fetched successfully',
        data: tpsList,
      };
    } catch (error) {
      throw new HttpException(`Failed to fetch TPS list: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Public()
  @Get('/details-tps/:id')
  async findOne(@Param('id') id: string) {
    try {
      const tpsDetails = await this.tpsService.getTpsById(+id);
      if (!tpsDetails) {
        throw new HttpException(`TPS with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return {
        status_code: HttpStatus.OK,
        message: 'TPS details fetched successfully',
        data: tpsDetails,
      };
    } catch (error) {
      throw new HttpException(`Failed to fetch TPS details: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/update-tps/:id')
  async update(@Param('id') id: string, @Body() updateTpDto: UpdateTpDto) {
    try {
      await this.tpsService.updateTps(+id, updateTpDto);
      return {
        status_code: HttpStatus.OK,
        message: 'TPS updated successfully',
      };
    } catch (error) {
      throw new HttpException(`Failed to update TPS: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/delete-tps/:id')
  async remove(@Param('id') id: string) {
    try {
      await this.tpsService.deleteTps(+id);
      return {
        status_code: HttpStatus.OK,
        message: 'TPS deleted successfully',
      };
    } catch (error) {
      throw new HttpException(`Failed to delete TPS: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Public()
  @Get('/search-tps')
  async searchTps(@Query() searchDto: SearchTpsDto): Promise<TpsSearchResult> {
    try {
      const searchResults = await this.tpsService.tpsSearch(searchDto);
      if (searchResults.length === 0) {
        throw new HttpException('No TPS found for the provided search criteria', HttpStatus.NOT_FOUND);
      }
      return {
        status_code: HttpStatus.OK,
        message: 'TPS search successful',
        data: searchResults,
      };
    } catch (error) {
      throw new HttpException(`Failed to search TPS: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
