import { IsString, IsEnum, IsNumber, IsOptional, IsNotEmpty  } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateTpsDto {
  @IsNotEmpty()
  @IsNumber()
  tahun: number;

  @IsNotEmpty()
  @IsString()
  provinsi: string;

  @IsNotEmpty()
  @IsString()
  kabupatenKota: string;

  @IsNotEmpty()
  @IsString()
  namaFasilitas: string;

  @IsNotEmpty()
  @IsString()
  jenis: string;

  @IsNotEmpty()
  @IsString()
  open: string;

  @IsNotEmpty()
  @IsString()
  close: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  sampahMasuk: number;

  @IsNotEmpty()
  @IsNumber()
  sampahMasukLandfill: number;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;
}


