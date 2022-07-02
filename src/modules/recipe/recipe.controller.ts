import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipeDto } from 'src/modules/recipe/dtos/recipe.dto';
import { RecipeService } from 'src/modules/recipe/recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() createDto: RecipeDto) {
    return this.recipeService.create(createDto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.recipeService.get(id);
  }
}
