import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@Injectable()
export class SessaoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSessaoDto) {
    return this.prisma.sessao.create({ data: {
      ...data,
      dataHora: new Date(data.dataHora),
    }});
  }

  findAll() {
    return this.prisma.sessao.findMany({ include: { filme: true, sala: true } });
  }

  findOne(id: number) {
    return this.prisma.sessao.findUnique({ where: { id }, include: { filme: true, sala: true } });
  }

  update(id: number, data: UpdateSessaoDto) {
    return this.prisma.sessao.update({ where: { id }, data: {
      ...data,
      dataHora: data.dataHora ? new Date(data.dataHora) : undefined,
    }});
  }

  remove(id: number) {
    return this.prisma.sessao.delete({ where: { id } });
  }
}
