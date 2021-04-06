import { Body, Controller, Get, Post, Put , Delete } from '@nestjs/common';
import {BooksService} from './books.service';
import CreateBookDto from './dto/create-book.dto';

@Controller('books')
export default class BooksController {
  constructor(private readonly booksServices: BooksService) {}
  @Post('post')
  postGenre( @Body() book: CreateBookDto) {
    return this.booksServices.insert(book);
  }
  @Get()
  getAll() {
    return this.booksServices.getAllBooks();
  }
  @Put()
  UpdateUser(@Body() name: string,newValue: CreateBookDto){
    return this.booksServices.update(name,newValue);
  }

  @Delete()
  DeleteUser(@Body() name: string){
    return this.booksServices.delete(name);
  }
}