import { IsInt, IsString, IsNumber } from 'class-validator';

export class CreateSessaoDto {
  @IsInt()
  filmeId: number;

  @IsInt()
  salaId: number;

  @IsString()
  dataHora: string; // ISO string

  @IsNumber()
  preco: number;

  @IsString()
  idioma: string;

  @IsString()
  formato: string;
}
