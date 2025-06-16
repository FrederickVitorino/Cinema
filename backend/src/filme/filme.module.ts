// src/filme/filme.module.ts
import { Module } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { FilmeController } from './filme.controller';
// O PrismaModule já está global, então não precisa importar aqui

@Module({
  controllers: [FilmeController],
  providers: [FilmeService],
})
export class FilmeModule {}