import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  create(data: CreateEventDto) {
    return this.prismaService.event.create({
      data: { ...data, date: new Date(data.date) },
    });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateEventDto) {
    return this.prismaService.event.update({
      where: { id },
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
  }

  remove(id: string) {
    return this.prismaService.event.delete({ where: { id } });
  }
}
