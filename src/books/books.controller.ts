import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return { books: this.booksService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Post()
  create(@Body() book: { title: string; authorId: number }) {
    return this.booksService.create(book);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() bookUpdate: { title?: string; authorId?: number },
  ) {
    return this.booksService.update(+id, bookUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.booksService.delete(+id);
  }
}
