import { Controller, Get, Query } from '@nestjs/common';
import { SearchParams } from 'src/modules/search/search.dto';
import { SearchService } from 'src/modules/search/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() searchParams: SearchParams) {
    return this.searchService.search(searchParams);
  }
}
