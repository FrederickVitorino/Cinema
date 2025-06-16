// src/usuario/dto/update-filme.dto.ts
import { PartialType } from '@nestjs/mapped-types'; // Mapped-types é geralmente instalado com o NestJS
import { CreateFilmeDto } from './create-filme.dto';

export class UpdateFilmeDto extends PartialType(CreateFilmeDto) {}