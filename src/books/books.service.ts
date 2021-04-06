import BookEntity from '../db/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/genre.entity';
import {DeleteResult} from "typeorm";

export class BooksService {

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID) ;
    book.genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await GenreEntity.findOne(genreIDs[i]);
             book.genres.push(genre);
    }
    await book.save();
    return book;
  }
  async getAllBooks(): Promise<BookEntity[] > {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return BookEntity.find();
  }
  async update(
    name: string,
    newValue: CreateBookDto,
  ): Promise<BookEntity | null> {
    const todo = await BookEntity.findOneOrFail(name);
    if (!todo.name) {
      // tslint:disable-next-line:no-console
      console.error("Todo doesn't exist");
    }
    await this.update(name, newValue);
    return await BookEntity.findOne(name);
  }

  async delete(name: string): Promise<DeleteResult> {
    return await BookEntity.delete(name);
  }
}