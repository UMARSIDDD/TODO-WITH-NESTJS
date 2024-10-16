import { Prisma } from '@prisma/client';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

export class TodoMapper {
  // Method to map CreateTodoDto to Prisma's TodoCreateInput (for creation)
  static toPrismaCreateInput(dto: CreateTodoDto): Prisma.TodoCreateInput {
    return {
      title: dto.title,
      description: dto.description,
    };
  }

  // Method to map UpdateTodoDto to Prisma's TodoUpdateInput (for update)
  static toPrismaUpdateInput(dto: UpdateTodoDto): Prisma.TodoUpdateInput {
    const updateData: Prisma.TodoUpdateInput = {};

    if (dto.title !== undefined) {
      updateData.title = dto.title;
    }

    if (dto.description !== undefined) {
      updateData.description = dto.description;
    }

    return updateData;
  }
}
