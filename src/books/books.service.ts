import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { PublisherService } from 'src/publisher/publisher.service';

@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      title: 'Think and Grow Rich',
      authorId: 1,
      publisherId: 3,
    },
    {
      id: 2,
      title: 'The Great Gatsby',
      authorId: 3,
      publisherId: 3,
    },
    {
      id: 3,
      title: 'A Tale of Two Cities',
      authorId: 2,
      publisherId: 2,
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      authorId: 2,
      publisherId: 1,
    },
  ];

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly publisherService: PublisherService,
  ) {}

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  create(book: { title: string; authorId: number; publisherId: number }) {
    if (!this.authorsService.getAvailableAuthorsIds().includes(book.authorId)) {
      throw new BadRequestException(`Author with ID ${book.authorId} does not exist
        Insert a valid authorId from the following list: ${this.authorsService.getAvailableAuthorsIds().join(', ')} or create a new author`);
    }
    if (
      !this.publisherService
        .getAvailablePublishersIds()
        .includes(book.publisherId)
    ) {
      throw new BadRequestException(`Publisher with ID ${book.publisherId} does not exist
        Insert a valid publisherId from the following list: ${this.publisherService.getAvailablePublishersIds().join(', ')} or create a new publisher`);
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
    book: { title?: string; authorId?: number; publisherId?: number },
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
      !this.publisherService
        .getAvailablePublishersIds()
        .includes(book.publisherId)
    ) {
      throw new BadRequestException(`Publisher with ID ${book.publisherId} does not exist
        Insert a valid publisherId from the following list: ${this.publisherService.getAvailablePublishersIds().join(', ')} or create a new publisher`);
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
