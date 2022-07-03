import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchParams } from 'src/modules/search/search.dto';
import { SearchService } from 'src/modules/search/search.service';

@Controller('search')
@ApiTags('Search feature')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() searchParams: SearchParams) {
    return this.searchService.search(searchParams);
  }
}
