import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecipeDto } from 'src/modules/recipe/dtos/recipe.dto';
import { RecipeService } from 'src/modules/recipe/recipe.service';

@Controller('recipes')
@ApiTags('Recipe')
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: RecipeDto) {
    return this.recipeService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.recipeService.delete(id);
  }
}
