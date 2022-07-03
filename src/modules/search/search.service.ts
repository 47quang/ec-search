import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as _ from 'lodash';
import { Indices } from 'src/constants/indices';
import { SearchParams } from 'src/modules/search/search.dto';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}
  public async search(searchParams: SearchParams) {
    // search by specified id
    const { ids } = searchParams;
    if (!_.isEmpty(ids)) {
      return this.searchById(ids);
    }
    const searchQuery = this.buildSearchQuery(searchParams);
    if (_.isEmpty(searchQuery)) return [];

    try {
      const response = await this.esService.search({
        index: Indices.RECIPE,
        body: searchQuery,
      });

      const searchResults = _.get(response, 'body.hits.hits', []);
      return _.map(searchResults, '_source');
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * search by ids
   * @param ids
   * @returns
   */
  private searchById(ids: string[]) {
    return [];
  }

  private buildSearchQuery(searchParams: SearchParams) {
    const sortCondition = this.getSortCondition(searchParams);
    const searchCondition = this.buildSearchCondition(searchParams);

    // only show necessary field in list search results
    const selectedFields = ['id', 'title', 'thumbnail', 'content', 'views'];
    const { page, perpage } = searchParams;
    const queryContainer: Record<string, any> = {
      size: perpage,
      from: page * perpage,
      _source: selectedFields,
    };

    if (!_.isEmpty(sortCondition)) {
      queryContainer.sort = sortCondition;
    }

    if (_.isEmpty(searchCondition)) return;
    queryContainer.query = searchCondition;

    return queryContainer;
  }

  private buildSearchCondition(searchParams: SearchParams) {
    const searchContainer: Record<string, any> = {
      bool: {
        must: [
          {
            multi_match: {
              query: searchParams.q,
              // ^3 is to triple weight for the field title
              fields: ['search.title^4', 'search.merged_search^3', 'search.content'],
              fuzziness: searchParams.fuzzy ? 1 : 0,
              prefix_length: 2,
            },
          },
        ],
      },
    };

    console.log('searchContainer', JSON.stringify(searchContainer));

    const scopeCondition = this.getScopeCondition(searchParams);
    if (!_.isEmpty(scopeCondition)) {
      searchContainer.bool.must.push(scopeCondition);
    }

    return searchContainer;
  }

  /**
   * generate scope for search by category
   * @param searchParams
   * @returns
   */
  private getScopeCondition(searchParams: SearchParams) {
    const { categoryId } = searchParams;
    if (!categoryId) return;
    return { term: { 'category.id': categoryId } };
  }

  private getSortCondition(searchParams: SearchParams) {
    console.log(searchParams);
    return;
  }
}
