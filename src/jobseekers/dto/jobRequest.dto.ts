import { IsString , IsNumber , IsOptional} from 'class-validator';

export default class CreateJobRequestDto {

    @IsNumber()
    readonly jobRequestID: number;

    @IsNumber()
    readonly userID: number;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsString()
    readonly date: string;
  }