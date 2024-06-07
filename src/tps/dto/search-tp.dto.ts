import { Status } from '@prisma/client';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class SearchTpsDto {

  @IsString()
  @IsOptional()
  provinsi: string;

  @IsString()
  @IsOptional()
  kabupatenKota: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;

}
