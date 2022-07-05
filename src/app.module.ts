import { Module } from '@nestjs/common';
import { RecipeModule } from 'src/modules/recipe/recipe.module';
import { SearchModule } from 'src/modules/search/search.module';
import { TagModule } from 'src/modules/tag/tag.module';
import { SharedModule } from 'src/shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SharedModule, RecipeModule, SearchModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
