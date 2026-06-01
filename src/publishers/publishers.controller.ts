import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PublishersService } from './publishers.service';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  findAll() {
    const publishers = this.publishersService.findAll();
    return { status: HttpStatus.OK, body: publishers };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const publisher = this.publishersService.findOne(id);
    return { status: HttpStatus.OK, body: publisher };
  }

  @Post()
  create(@Body() publisher: { name: string; address: string }) {
    const createdPublisher = this.publishersService.create(publisher);
    return {
      status: HttpStatus.CREATED,
      body: createdPublisher,
    };
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() publisherUpdate: { name?: string; address?: string },
  ) {
    const updatedPublisher = this.publishersService.update(id, publisherUpdate);
    return {
      status: HttpStatus.OK,
      body: updatedPublisher,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.publishersService.delete(id);
    return {
      status: HttpStatus.NO_CONTENT,
      body: `Publisher with ID ${id} has been deleted successfully`,
    };
  }
}
