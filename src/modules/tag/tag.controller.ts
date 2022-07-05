import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagDto } from 'src/modules/tag/dtos/tag.dto';
import { TagService } from 'src/modules/tag/tag.service';

@Controller('tags')
@ApiTags('Tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() createDto: TagDto) {
    return this.tagService.create(createDto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.tagService.get(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: TagDto) {
    return this.tagService.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tagService.delete(id);
  }
}
