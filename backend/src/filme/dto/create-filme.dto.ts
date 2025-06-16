import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFilmeDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  genero: string;

  @IsNotEmpty()
  @IsString()
  classificacao: string;

  @IsNotEmpty()
  duracao: number;

  @IsNotEmpty()
  dataEstreia: Date;

  @IsNotEmpty()
  @IsString()
  descricao: string;
}