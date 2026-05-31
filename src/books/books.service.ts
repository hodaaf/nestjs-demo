import { Injectable } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      title: 'Think and Grow Rich',
      authorId: 1,
    },
    {
      id: 2,
      title: 'The Great Gatsby',
      authorId: 3,
    },
    {
      id: 3,
      title: 'A Tale of Two Cities',
      authorId: 2,
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      authorId: 2,
    },
  ];

  constructor(private readonly authorsService: AuthorsService) {}

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find((book) => book.id === id);
  }

  create(book: { title: string; authorId: number }) {
    if (!this.authorsService.getAvailableAuthorsIds().includes(book.authorId)) {
      throw new Error(`Author with ID ${book.authorId} does not exist
        Insert a valid authorId from the following list: ${this.authorsService.getAvailableAuthorsIds().join(', ')} or create a new author`);
    }
    const newBook = {
      id: this.books[this.books.length - 1].id + 1,
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, book: { title?: string; authorId?: number }) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new Error(`Book with ID ${id} not found`);
    }
    if (
      book.authorId &&
      !this.authorsService.getAvailableAuthorsIds().includes(book.authorId)
    ) {
      throw new Error(`Author with ID ${book.authorId} does not exist
        Insert a valid authorId from the following list: ${this.authorsService.getAvailableAuthorsIds().join(', ')} or create a new author`);
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
      throw new Error(`Book with ID ${id} not found`);
    }
    this.books.splice(bookIndex, 1);
  }
}
