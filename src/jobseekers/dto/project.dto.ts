import { IsString , IsNumber , IsOptional} from 'class-validator';

export default class CreateProjectDto {

    @IsNumber()
    readonly projectID: number;

    @IsString()
    readonly projectName: string;

    @IsNumber()
    readonly userID: number;

    @IsString()
    readonly type:string;

    @IsString()
    readonly deadline:string;

    @IsNumber()
    readonly price:number;
  }