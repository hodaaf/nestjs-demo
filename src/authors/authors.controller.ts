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
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    const authors = this.authorsService.findAll();
    return { status: HttpStatus.OK, body: authors };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const author = this.authorsService.findOne(id);
    return { status: HttpStatus.OK, body: author };
  }

  @Post()
  create(@Body() author: { name: string; email: string }) {
    const createdAuthor = this.authorsService.create(author);
    return { status: HttpStatus.CREATED, body: createdAuthor };
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorUpdate: { name?: string; email?: string },
  ) {
    const updatedAuthor = this.authorsService.update(id, authorUpdate);
    return { status: HttpStatus.OK, body: updatedAuthor };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.authorsService.delete(id);
    return {
      status: HttpStatus.NO_CONTENT,
      body: `Author with ID ${id} has been deleted successfully`,
    };
  }
}
