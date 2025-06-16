import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from '../../generated/prisma';

@Injectable()
export class FilmeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto): Promise<Filme> {
    return this.prisma.filme.create({
      data: {
        titulo: createFilmeDto.titulo,
        genero: createFilmeDto.genero,
        classificacao: createFilmeDto.classificacao,
        duracao: createFilmeDto.duracao,
        dataEstreia: createFilmeDto.dataEstreia,
        descricao: createFilmeDto.descricao,
      },
    });
  }

  async findAll(): Promise<Filme[]> {
    return this.prisma.filme.findMany();
  }

  async findOne(id: number): Promise<Filme> {
    const filme = await this.prisma.filme.findUnique({ where: { id } });
    if (!filme) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado.`);
    }
    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto): Promise<Filme> {
    const filme = await this.prisma.filme.findUnique({ where: { id } });
    if (!filme) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado para atualização.`);
    }
    return this.prisma.filme.update({
      where: { id },
      data: {
        ...updateFilmeDto,
        dataEstreia: updateFilmeDto.dataEstreia,
      },
    });
  }

  async remove(id: number): Promise<Filme> {
    const filme = await this.prisma.filme.findUnique({ where: { id } });
    if (!filme) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado para remoção.`);
    }
    return this.prisma.filme.delete({ where: { id } });
  }
}