import { IsString, IsNotEmpty, MaxLength, isNotEmpty, MinLength } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    title: string;
  
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    @MaxLength(500)
    description?: string;
}
