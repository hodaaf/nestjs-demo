import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class GenresService {
  private genres = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Non-Fiction' },
    { id: 3, name: 'Science Fiction' },
    { id: 4, name: 'Fantasy' },
    { id: 5, name: 'Mystery' },
    { id: 6, name: 'Biography' },
    { id: 7, name: 'History' },
    { id: 8, name: 'Romance' },
    { id: 9, name: 'Thriller' },
    { id: 10, name: 'Young Adult' },
  ];

  findAll() {
    return this.genres;
  }

  findOne(id: number) {
    const genre = this.genres.find((genre) => genre.id === id);
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  create(genre: { name: string }) {
    const exists = this.genres.some(
      (g) => g.name.toLowerCase() === genre.name.toLowerCase(),
    );
    if (exists) {
      throw new BadRequestException(
        `Genre with name ${genre.name} already exists`,
      );
    }
    const newGenre = {
      id: this.genres.length + 1,
      name: genre.name,
    };
    this.genres.push(newGenre);
    return newGenre;
  }

  update(id: number, genre: { name?: string }) {
    const genreIndex = this.genres.findIndex((genre) => genre.id === id);

    if (genreIndex === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    if (genre.name) {
      const normalizedNewName = genre.name.toLowerCase();
      const duplicateGenre = this.genres.find(
        (g) => g.id !== id && g.name.toLowerCase() === normalizedNewName,
      );

      if (duplicateGenre) {
        throw new BadRequestException(
          `Genre with name ${genre.name} already exists`,
        );
      }

      this.genres[genreIndex] = {
        ...this.genres[genreIndex],
        ...genre,
      };
      return this.genres[genreIndex];
    }
  }

  delete(id: number) {
    const genreIndex = this.genres.findIndex((genre) => genre.id === id);
    if (genreIndex === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    this.genres.splice(genreIndex, 1);
    return { message: `Genre with ID ${id} has been deleted` };
  }

  getAvailableGenresIds() {
    return this.genres.map((genre) => genre.id);
  }
}
