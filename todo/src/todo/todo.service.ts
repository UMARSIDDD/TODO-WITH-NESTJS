import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { TodoMapper } from './mapper/Todomapper';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService:DatabaseService){}
  async create(createTodoDto: CreateTodoDto) {
    // const data = plainToInstance(Prisma.TodoCreateInput, createTodoDto);
    const data:Prisma.TodoCreateInput={
      title:createTodoDto.title,
      description:createTodoDto.description

    }

    return this.databaseService.todo.create({
      data:data
    });
  }

  async findAll() {
    return this.databaseService.todo.findMany();
  }

  async findOne(id: number) {
    const todo =await this.databaseService.todo.findUnique({
      where:{
        id
      }
    });
    if(!todo){
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }
    return todo
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const data=TodoMapper.toPrismaUpdateInput(updateTodoDto)
    const todo= this.databaseService.todo.update({
      where:{
        id
      },data
    }) ;
    if(!todo){
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }
    return todo
  }

  async remove(id: number) {
    const todo= this.databaseService.todo.delete({
      where:{
        id
      }
    });
    if(!todo){
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }
    return todo
  }
}
