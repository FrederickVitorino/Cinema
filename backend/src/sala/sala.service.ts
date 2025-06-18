import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from '../../generated/prisma';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSalaDto): Promise<Sala> {
    return this.prisma.sala.create({ data });
  }

  async findAll(): Promise<Sala[]> {
    return this.prisma.sala.findMany();
  }

  async findOne(id: number): Promise<Sala> {
    const sala = await this.prisma.sala.findUnique({ where: { id } });
    if (!sala) {
      throw new NotFoundException(`Sala com ID ${id} não encontrada.`);
    }
    return sala;
  }

  async update(id: number, data: UpdateSalaDto): Promise<Sala> {
    const sala = await this.prisma.sala.findUnique({ where: { id } });
    if (!sala) {
      throw new NotFoundException(`Sala com ID ${id} não encontrada para atualização.`);
    }
    return this.prisma.sala.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Sala> {
    const sala = await this.prisma.sala.findUnique({ where: { id } });
    if (!sala) {
      throw new NotFoundException(`Sala com ID ${id} não encontrada para remoção.`);
    }
    return this.prisma.sala.delete({ where: { id } });
  }
}
