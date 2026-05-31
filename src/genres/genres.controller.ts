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
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll() {
    const genres = this.genresService.findAll();
    return { status: HttpStatus.OK, body: genres };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const genre = this.genresService.findOne(+id);
    return { status: HttpStatus.OK, body: genre };
  }

  @Post()
  create(@Body() genre: { name: string }) {
    const createdGenre = this.genresService.create(genre);
    return { status: HttpStatus.CREATED, body: createdGenre };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() genre: { name?: string }) {
    const updatedGenre = this.genresService.update(+id, genre);
    return { status: HttpStatus.OK, body: updatedGenre };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.genresService.delete(+id);
    return { status: HttpStatus.NO_CONTENT };
  }
}
