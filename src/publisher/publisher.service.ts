import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PublisherService {
  private publishers = [
    {
      id: 1,
      name: 'Penguin Random House',
      address: '1745 Broadway, New York, NY 10019',
    },
    {
      id: 2,
      name: 'HarperCollins',
      address: '195 Broadway, New York, NY 10007',
    },
    {
      id: 3,
      name: 'Simon & Schuster',
      address: '1230 Avenue of the Americas, New York, NY 10020',
    },
  ];

  findAll() {
    return this.publishers;
  }

  findOne(id: number) {
    const publisher = this.publishers.find((publisher) => publisher.id === id);
    if (!publisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return publisher;
  }

  create(publisher: { name: string; address: string }) {
    const newPublisher = {
      id: this.publishers[this.publishers.length - 1].id + 1,
      ...publisher,
    };
    this.publishers.push(newPublisher);
    return newPublisher;
  }

  update(id: number, publisher: { name?: string; address?: string }) {
    const publisherIndex = this.publishers.findIndex(
      (publisher) => publisher.id === id,
    );

    if (publisherIndex === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    this.publishers[publisherIndex] = {
      ...this.publishers[publisherIndex],
      ...publisher,
    };
    return this.publishers[publisherIndex];
  }

  delete(id: number) {
    const publisherIndex = this.publishers.findIndex(
      (publisher) => publisher.id === id,
    );
    if (publisherIndex === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    this.publishers.splice(publisherIndex, 1);

    return { message: `Publisher with ID ${id} has been deleted` };
  }

  getAvailablePublishersIds() {
    return this.publishers.map((publisher) => publisher.id);
  }
}
