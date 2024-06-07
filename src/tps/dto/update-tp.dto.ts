import { PartialType } from '@nestjs/swagger';
import { CreateTpsDto } from './create-tp.dto';

export class UpdateTpDto extends PartialType(CreateTpsDto) {}
