import { IsString , IsNumber , IsOptional} from 'class-validator';

export default class CreateCommentDto {

    @IsNumber()
    readonly commentID: number;

    @IsNumber()
    readonly userID: number;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsString()
    readonly date: string;

    @IsNumber()
    readonly score: number;
  
  }