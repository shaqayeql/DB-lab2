
import { Injectable } from '@nestjs/common';
import CreateGenreDto from './dto/create-genre.dto';
import GenreEntity from '../db/genre.entity';
import {DeleteResult} from "typeorm";

@Injectable()
export default class GenreServices {
    async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {

    const genreEntity: GenreEntity = GenreEntity.create();
    const {type} = genreDetails;

    genreEntity.type = type;
    await GenreEntity.save(genreEntity);
    return genreEntity;
  }
  async getAllGenre(): Promise<GenreEntity[]> {
        return await GenreEntity.find();
  }
  async update(
    type: string,
    newValue: CreateGenreDto,
  ): Promise<GenreEntity | null> {
    const todo = await GenreEntity.findOneOrFail(type);
    if (!todo.type) {
      // tslint:disable-next-line:no-console
      console.error("Todo doesn't exist");
    }
    await this.update(type, newValue);
    return await GenreEntity.findOne(type);
  }

  async delete(type: string): Promise<DeleteResult> {
    return await GenreEntity.delete(type);
  }
}
