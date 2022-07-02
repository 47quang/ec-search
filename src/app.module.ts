import { Module } from '@nestjs/common';
import { RecipeModule } from 'src/modules/recipe/recipe.module';
import { SharedModule } from 'src/shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SharedModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
