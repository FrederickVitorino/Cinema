import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSalaDto) {
    return this.prisma.sala.create({ data });
  }

  findAll() {
    return this.prisma.sala.findMany();
  }

  findOne(id: number) {
    return this.prisma.sala.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateSalaDto) {
    return this.prisma.sala.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.sala.delete({ where: { id } });
  }
}
