import { IsString, IsInt } from 'class-validator';

export class CreateIngressoDto {
  @IsString()
  nome: string;

  @IsString()
  cpf: string;

  @IsInt()
  sessaoId: number;

  @IsString()
  assento: string;

  @IsString()
  formaPagamento: string;
}
