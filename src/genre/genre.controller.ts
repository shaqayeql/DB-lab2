import { Body, Controller, Get, Post, Put , Delete } from '@nestjs/common';
import GenreServices from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreServices) {}
  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreServices.insert(genre);
  }
  @Get()
  getAll() {
    return this.genreServices.getAllGenre();
  }

  @Put()
  UpdateUser(@Body() type: string,newValue: CreateGenreDto){
    return this.genreServices.update(type,newValue);
  }

  @Delete()
  DeleteUser(@Body() type: string){
    return this.genreServices.delete(type);
  }
}