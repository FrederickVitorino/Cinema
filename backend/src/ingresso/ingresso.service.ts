import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Injectable()
export class IngressoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateIngressoDto) {
    // Não permitir venda de assento já vendido para a mesma sessão
    const exists = await this.prisma.ingresso.findFirst({
      where: { sessaoId: data.sessaoId, assento: data.assento },
    });
    if (exists) {
      throw new BadRequestException('Assento já vendido para esta sessão.');
    }
    return this.prisma.ingresso.create({ data });
  }

  findAll() {
    return this.prisma.ingresso.findMany({ include: { sessao: true } });
  }

  findOne(id: number) {
    return this.prisma.ingresso.findUnique({ where: { id }, include: { sessao: true } });
  }

  update(id: number, data: UpdateIngressoDto) {
    return this.prisma.ingresso.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.ingresso.delete({ where: { id } });
  }
}
