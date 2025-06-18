import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { Ingresso } from '../../generated/prisma';

@Injectable()
export class IngressoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateIngressoDto): Promise<Ingresso> {
    const exists = await this.prisma.ingresso.findFirst({
      where: { sessaoId: data.sessaoId, assento: data.assento },
    });
    if (exists) {
      throw new BadRequestException('Assento já vendido para esta sessão.');
    }
    return this.prisma.ingresso.create({ data });
  }

  async findAll(): Promise<Ingresso[]> {
    return this.prisma.ingresso.findMany({ include: { sessao: true } });
  }

  async findOne(id: number): Promise<Ingresso> {
    const ingresso = await this.prisma.ingresso.findUnique({ where: { id }, include: { sessao: true } });
    if (!ingresso) {
      throw new NotFoundException(`Ingresso com ID ${id} não encontrado.`);
    }
    return ingresso;
  }

  async update(id: number, data: UpdateIngressoDto): Promise<Ingresso> {
    const ingresso = await this.prisma.ingresso.findUnique({ where: { id } });
    if (!ingresso) {
      throw new NotFoundException(`Ingresso com ID ${id} não encontrado para atualização.`);
    }
    return this.prisma.ingresso.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Ingresso> {
    const ingresso = await this.prisma.ingresso.findUnique({ where: { id } });
    if (!ingresso) {
      throw new NotFoundException(`Ingresso com ID ${id} não encontrado para remoção.`);
    }
    return this.prisma.ingresso.delete({ where: { id } });
  }
}
