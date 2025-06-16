import { IsString, IsInt } from 'class-validator';

export class CreateSalaDto {
  @IsString()
  nome: string;

  @IsInt()
  capacidade: number;

  @IsString()
  tipo: string;
}
