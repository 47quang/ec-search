import { Injectable } from '@nestjs/common';
import { RecipeDto } from 'src/modules/recipe/dtos/recipe.dto';

@Injectable()
export class RecipeService {
  public async create(createDto: RecipeDto) {
    console.log(createDto);
  }

  public async get(id: string) {
    console.log(id);
  }
}
