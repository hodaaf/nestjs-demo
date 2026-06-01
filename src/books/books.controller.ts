import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('includeAuthor', ParseBoolPipe) includeAuthor: boolean) {
    const books = this.booksService.findAll(includeAuthor);
    return { status: HttpStatus.OK, body: books };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const book = this.booksService.findOne(id);
    return { status: HttpStatus.OK, body: book };
  }

  @Post()
  create(
    @Body()
    book: {
      title: string;
      authorId: number;
      publisherId: number;
      genreIds: number[];
    },
  ) {
    const createdBook = this.booksService.create(book);
    return { status: HttpStatus.CREATED, body: createdBook };
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    bookUpdate: {
      title?: string;
      authorId?: number;
      publisherId?: number;
      genreIds?: number[];
    },
  ) {
    const updatedBook = this.booksService.update(id, bookUpdate);
    return { status: HttpStatus.OK, body: updatedBook };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.booksService.delete(id);
    return {
      status: HttpStatus.NO_CONTENT,
      body: `Book with ID ${id} has been deleted successfully`,
    };
  }
}
