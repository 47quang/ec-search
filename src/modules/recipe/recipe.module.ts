import { Module } from '@nestjs/common';
import { RecipeController } from 'src/modules/recipe/recipe.controller';
import { RecipeService } from 'src/modules/recipe/recipe.service';

@Module({
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
