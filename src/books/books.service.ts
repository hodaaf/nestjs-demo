import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { GenresService } from 'src/genres/genres.service';
import { PublishersService } from 'src/publishers/publishers.service';

@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      title: 'Think and Grow Rich',
      authorId: 1,
      publisherId: 3,
      genreIds: [1, 3, 4],
    },
    {
      id: 2,
      title: 'The Great Gatsby',
      authorId: 3,
      publisherId: 3,
      genreIds: [1, 4, 5],
    },
    {
      id: 3,
      title: 'A Tale of Two Cities',
      authorId: 2,
      publisherId: 2,
      genreIds: [2, 6, 7],
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      authorId: 2,
      publisherId: 1,
      genreIds: [1, 4, 8],
    },
  ];

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly publishersService: PublishersService,
    private readonly genresService: GenresService,
  ) {}

  findAll(includeAuthor: boolean) {
    if (includeAuthor) {
      return this.books.map((book) => {
        const author = this.authorsService.findOne(book.authorId);
        return { ...book, author };
      });
    }
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  create(book: {
    title: string;
    authorId: number;
    publisherId: number;
    genreIds: number[];
  }) {
    if (!this.authorsService.getAvailableAuthorsIds().includes(book.authorId)) {
      throw new BadRequestException(`Author with ID ${book.authorId} does not exist
        Insert a valid authorId from the following list: ${this.authorsService.getAvailableAuthorsIds().join(', ')} or create a new author`);
    }
    if (
      !this.publishersService
        .getAvailablePublishersIds()
        .includes(book.publisherId)
    ) {
      throw new BadRequestException(`Publisher with ID ${book.publisherId} does not exist
        Insert a valid publisherId from the following list: ${this.publishersService.getAvailablePublishersIds().join(', ')} or create a new publisher`);
    }

    if (
      !book.genreIds.every((genreId) =>
        this.genresService.getAvailableGenresIds().includes(genreId),
      )
    ) {
      throw new BadRequestException(`One or more genreIds do not exist
        Insert valid genreIds from the following list: ${this.genresService.getAvailableGenresIds().join(', ')} or create new genres`);
    }
    const newBook = {
      id: this.books[this.books.length - 1].id + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(
    id: number,
    book: {
      title?: string;
      authorId?: number;
      publisherId?: number;
      genreIds?: number[];
    },
  ) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    if (
      book.authorId &&
      !this.authorsService.getAvailableAuthorsIds().includes(book.authorId)
    ) {
      throw new BadRequestException(`Author with ID ${book.authorId} does not exist
        Insert a valid authorId from the following list: ${this.authorsService.getAvailableAuthorsIds().join(', ')} or create a new author`);
    }
    if (
      book.publisherId &&
      !this.publishersService
        .getAvailablePublishersIds()
        .includes(book.publisherId)
    ) {
      throw new BadRequestException(`Publisher with ID ${book.publisherId} does not exist
        Insert a valid publisherId from the following list: ${this.publishersService.getAvailablePublishersIds().join(', ')} or create a new publisher`);
    }
    if (
      book.genreIds &&
      !book.genreIds.every((genreId) =>
        this.genresService.getAvailableGenresIds().includes(genreId),
      )
    ) {
      throw new BadRequestException(`One or more genreIds do not exist
        Insert valid genreIds from the following list: ${this.genresService.getAvailableGenresIds().join(', ')} or create new genres`);
    }
    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...book,
    };
    return this.books[bookIndex];
  }

  delete(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    this.books.splice(bookIndex, 1);
    return { message: `Book with ID ${id} has been deleted` };
  }
}
