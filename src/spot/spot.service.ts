import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpotStatus } from '@prisma/client';

type CreateSpotInput = CreateSpotDto & { eventId: string };
@Injectable()
export class SpotService {
  constructor(private prismaService: PrismaService) {}

  async create(createSpotDto: CreateSpotInput) {
    try {
      const event = await this.prismaService.event.findUnique({
        where: { id: createSpotDto.eventId },
      });
      if (!event) throw new BadRequestException('Event not Found!');

      return this.prismaService.spot.create({
        data: { ...createSpotDto, status: SpotStatus.available },
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({ where: { eventId } });
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findUnique({
      where: { id: spotId, eventId },
    });
  }

  update({
    eventId,
    spotId,
    updateSpotDto,
  }: {
    eventId: string;
    spotId: string;
    updateSpotDto: UpdateSpotDto;
  }) {
    return this.prismaService.spot.update({
      where: { id: spotId, eventId },
      data: updateSpotDto,
    });
  }

  remove(eventId: string, spotId: string) {
    return this.prismaService.spot.delete({
      where: { id: spotId, eventId },
    });
  }
}
