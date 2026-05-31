import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [AuthorsModule, BooksModule, PublisherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
