import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  private authors = [
    {
      id: 1,
      name: 'Jane Austen',
      email: 'jane.austen@example.com',
    },
    {
      id: 2,
      name: 'Charles Dickens',
      email: 'charles.dickens@example.com',
    },
    {
      id: 3,
      name: 'Mark Twain',
      email: 'mark.twain@example.com',
    },
  ];

  findAll() {
    return this.authors;
  }

  findOne(id: number) {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  create(author: { name: string; email: string }) {
    const newAuthor = {
      id: this.authors[this.authors.length - 1].id + 1,
      ...author,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  update(id: number, author: { name?: string; email?: string }) {
    const authorIndex = this.authors.findIndex((author) => author.id === id);

    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors[authorIndex] = {
      ...this.authors[authorIndex],
      ...author,
    };
    return this.authors[authorIndex];
  }

  delete(id: number) {
    const authorIndex = this.authors.findIndex((author) => author.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors.splice(authorIndex, 1);

    return authorIndex;
  }

  getAvailableAuthorsIds() {
    return this.authors.map((author) => author.id);
  }
}
