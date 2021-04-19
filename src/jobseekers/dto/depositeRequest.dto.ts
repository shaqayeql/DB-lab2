import { IsString , IsNumber , IsOptional} from 'class-validator';
export default class CreateDepositeRequestDto {

    
    readonly depositRequestID: number;

    
    readonly userID: number;

   
    readonly description: string;

    
    readonly date: string;
  }