import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get()
  findAll() {
    const publishers = this.publisherService.findAll();
    return { status: HttpStatus.OK, body: publishers };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const publisher = this.publisherService.findOne(+id);
    return { status: HttpStatus.OK, body: publisher };
  }

  @Post()
  create(@Body() publisher: { name: string; address: string }) {
    const createdPublisher = this.publisherService.create(publisher);
    return {
      status: HttpStatus.CREATED,
      body: createdPublisher,
    };
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() publisherUpdate: { name?: string; address?: string },
  ) {
    const updatedPublisher = this.publisherService.update(+id, publisherUpdate);
    return {
      status: HttpStatus.OK,
      body: updatedPublisher,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.publisherService.delete(+id);
    return {
      status: HttpStatus.NO_CONTENT,
      body: `Publisher with ID ${id} has been deleted successfully`,
    };
  }
}
