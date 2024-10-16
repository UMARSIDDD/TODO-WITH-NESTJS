import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsString, IsOptional, MaxLength, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(255)
    @MinLength(3)
    title?: string;
  
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(5)

    @MaxLength(500)
    description?: string;
}
