import { Module } from '@nestjs/common';
import { TagController } from 'src/modules/tag/tag.controller';
import { TagService } from 'src/modules/tag/tag.service';

@Module({
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
