import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as _ from 'lodash';
import { Indices, SortEnum } from 'src/constants/indices';
import { SearchParams } from 'src/modules/search/search.dto';

const hashtagRegex = /^#[^ !@#$%^&*(),.?":{}|<>]*$/;

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}
  public async search(searchParams: SearchParams) {
    // search by specified id
    const searchType: any = {};
    const { ids, authorId, q } = searchParams;
    if (hashtagRegex.test(q)) {
      searchType['recipes'] = this.buildSearchQuery(searchParams);
      searchType['tags'] = this.buildSearchTag(q);
    } else if (!_.isEmpty(authorId)) {
      searchType['recipes'] = this.buildSearchQueryByVendor(authorId);
    } else if (!_.isEmpty(ids)) {
      searchType['recipes'] = this.buildSearchQueryByIds(ids);
    } else {
      searchType['recipes'] = this.buildSearchQuery(searchParams);
    }

    const result: Record<string, any> = {};
    for (const type in searchType) {
      const searchQuery = searchType[type];
      if (type === 'tags') {
        try {
          const response = await this.esService.search({
            index: Indices.TAG,
            body: searchQuery,
          });
          const searchResults = _.get(response, 'body.hits.hits', []);
          result[type] = _.map(searchResults, '_source');
        } catch (error) {
          console.log(error);
          result[type] = [];
        }
      } else if (type === 'recipes') {
        if (_.isEmpty(searchQuery)) {
          result[type] = [];
          continue;
        }
        try {
          const response = await this.esService.search({
            index: Indices.RECIPE,
            body: searchQuery,
          });

          const searchResults = _.get(response, 'body.hits.hits', []);
          result[type] = _.map(searchResults, '_source');
        } catch (error) {
          console.log(error);
          result[type] = [];
        }
      }
    }
    return result;
  }

  private buildSearchTag(searchTerms: string) {
    return {
      query: {
        match_phrase_prefix: {
          name: searchTerms,
        },
      },
    };
  }

  /**
   * search by ids
   * @param ids
   * @returns
   */
  private buildSearchQueryByIds(ids: string[]) {
    return {
      _source: { exclude: ['search'] }, // exclude custom field for search feature
      query: {
        bool: {
          must: [{ terms: { id: ids } }],
        },
      },
    };
  }

  private buildSearchQueryByVendor(vendorId: string) {
    const selectedFields = ['id', 'title', 'thumbnail', 'content', 'views'];
    return {
      _source: selectedFields, // exclude custom field for search feature
      query: { bool: { must: [{ term: { 'author.id': vendorId } }] } },
    };
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
      // _source: selectedFields,
    };

    if (!_.isEmpty(sortCondition)) {
      queryContainer.sort = sortCondition;
    }

    if (_.isEmpty(searchCondition)) return;
    queryContainer.query = searchCondition;

    return queryContainer;
  }

  private buildSearchCondition(searchParams: SearchParams) {
    const { q = '' } = searchParams;
    let additionalShould = [];
    if (hashtagRegex.test(q)) {
      additionalShould = [
        {
          nested: {
            path: 'tags',
            query: {
              match_phrase_prefix: {
                'tags.name.engram': q,
              },
            },
          },
        },
      ];
    }
    let searchContainer: Record<string, any> = {
      bool: {
        should: [
          {
            multi_match: {
              query: q,
              // ^3 is to triple weight for the field title
              fields: ['search.title^4', 'search.merged_search^3', 'search.content'],
              fuzziness: searchParams.fuzzy ? 1 : 0,
              prefix_length: 2,
            },
          },
          ...additionalShould,
        ],
      },
    };

    if (_.isEmpty(q)) {
      searchContainer = { bool: { should: [] } };
    }

    const scopeCondition = this.getScopeCondition(searchParams);
    if (!_.isEmpty(scopeCondition)) {
      searchContainer.bool.should.push(...scopeCondition);
    }

    return searchContainer;
  }

  /**
   * generate scope for search by category
   * @param searchParams
   * @returns
   */
  private getScopeCondition(searchParams: SearchParams) {
    const additionalScopes = [];
    const { categoryId, tagIds } = searchParams;
    if (categoryId) {
      additionalScopes.push({ term: { 'category.id': categoryId } });
    }

    if (!_.isEmpty(tagIds)) {
      const nested = {
        nested: {
          path: 'tags',
          query: {
            bool: {
              should: tagIds.map((tagId) => ({ term: { 'tags.id': tagId } })),
            },
          },
        },
      };
      additionalScopes.push(nested);
    }

    console.log({ additionalScopes });

    return additionalScopes;
  }

  private getSortCondition(searchParams: SearchParams) {
    const { sort } = searchParams;
    switch (sort) {
      case SortEnum.BY_CREATED_AT:
        return [{ created_at: { order: 'desc' } }];
      case SortEnum.BY_VIEWS:
        return [{ views: { order: 'desc' } }];
      default:
        return;
    }
    return;
  }
}
