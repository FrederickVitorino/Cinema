import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';
import { Sessao } from '../../generated/prisma';

@Injectable()
export class SessaoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSessaoDto): Promise<Sessao> {
    return this.prisma.sessao.create({ data: {
      ...data,
      dataHora: new Date(data.dataHora),
    }});
  }

  async findAll(): Promise<Sessao[]> {
    return this.prisma.sessao.findMany({ include: { filme: true, sala: true } });
  }

  async findOne(id: number): Promise<Sessao> {
    const sessao = await this.prisma.sessao.findUnique({ where: { id }, include: { filme: true, sala: true } });
    if (!sessao) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada.`);
    }
    return sessao;
  }

  async update(id: number, data: UpdateSessaoDto): Promise<Sessao> {
    const sessao = await this.prisma.sessao.findUnique({ where: { id } });
    if (!sessao) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada para atualização.`);
    }
    return this.prisma.sessao.update({ where: { id }, data: {
      ...data,
      dataHora: data.dataHora ? new Date(data.dataHora) : undefined,
    }});
  }

  async remove(id: number): Promise<Sessao> {
    const sessao = await this.prisma.sessao.findUnique({ where: { id } });
    if (!sessao) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada para remoção.`);
    }
    return this.prisma.sessao.delete({ where: { id } });
  }
}
