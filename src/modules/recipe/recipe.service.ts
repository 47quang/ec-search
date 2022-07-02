import { Injectable } from '@nestjs/common';
import { RecipeDto } from 'src/modules/recipe/dtos/recipe.dto';
import * as _ from 'lodash';
import { TagDto } from 'src/modules/recipe/dtos/tag.dto';
import { ProductDto } from 'src/modules/recipe/dtos/product.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Indices } from 'src/constants/indices';
import * as uuid from 'uuid';

@Injectable()
export class RecipeService {
  constructor(private readonly esService: ElasticsearchService) {}
  public async create(createDto: RecipeDto) {
    const _doc: any = _.cloneDeep(createDto);
    let docId = _.get(_doc, 'id');
    if (!docId) {
      docId = uuid.v4();
      _.set(_doc, 'id', docId);
    }
    _doc.search = this.searchParser(createDto);
    await this.esService.create({
      index: Indices.RECIPE,
      id: docId,
      body: _doc,
    });

    return _doc;
  }

  public async get(id: string) {
    try {
      const response = await this.esService.get({ index: Indices.RECIPE, id });
      return _.get(response, 'body._source', {});
    } catch (error) {
      return {};
    }
  }

  /**
   * reindex specified document in elasticsearch
   * @param id
   * @param updateDto
   * @returns
   */
  public async update(id: string, updateDto: RecipeDto) {
    const _doc: any = _.cloneDeep(updateDto);
    _doc.search = this.searchParser(_doc);

    await this.esService.update({
      index: Indices.RECIPE,
      id,
      body: {
        doc: _doc,
      },
    });

    return _doc;
  }

  public async delete(id: string) {
    const response = await this.esService.delete({ index: Indices.RECIPE, id });
    return _.get(response, 'statusCode');
  }

  private searchParser(recipe: RecipeDto): Record<string, any> {
    const { content, title, category, tags, products } = recipe;

    const searchContainer = {};
    let mergedSearch = '';
    if (content) {
      searchContainer['content'] = this.searchify(content);
    }
    if (title) {
      searchContainer['title'] = title;
      mergedSearch = this.combineTerm(mergedSearch, title);
    }
    if (!_.isEmpty(category)) {
      searchContainer['category'] = this.searchify(category.name);
      mergedSearch = this.combineTerm(mergedSearch, searchContainer['category']);
    }
    if (!_.isEmpty(tags)) {
      searchContainer['tags'] = this.combineTags(tags);
      mergedSearch = this.combineTerm(mergedSearch, searchContainer['tags']);
    }
    if (!_.isEmpty(products)) {
      searchContainer['products'] = this.combineProducts(products);
      mergedSearch = this.combineTerm(mergedSearch, searchContainer['products']);
    }

    searchContainer['merged_search'] = mergedSearch;
    return searchContainer;
  }

  private combineProducts(products: ProductDto[]) {
    let combine = '';
    for (const product of products) {
      const { name } = product;
      combine = this.combineTerm(combine, this.searchify(name));
    }

    return combine;
  }

  private combineTags(tags: TagDto[]) {
    let combine = '';
    for (const tag of tags) {
      const { type, name } = tag;
      combine = this.combineTerm(combine, this.searchify(type));
      combine = this.combineTerm(combine, this.searchify(name));
    }

    return combine;
  }

  private combineTerm(base: string, term: string) {
    return base && term ? `${base} ${term}` : term ? term : base;
  }

  private searchify = (query: any): string => {
    query = typeof query == 'string' || query instanceof String ? query.trim().toLowerCase() : null;
    if (query) {
      // Remove HTML Special characters
      query = query.replace(/&#?[a-z0-9]+;/g, ' ');
      // Remove HTML Tags
      query = query.replace(/<\/?[^>]+(>|$)/g, '');
      // remove allowed special characters but stand alone
      query = query.replace(/(\s+|^)([~`+-\-!@#$%^&*()_={}[\]|:;"'<>,.?/\\\s]+)(\s+|$)/g, ' ').replace(/\s\s+/g, ' ');
      return query.trim();
    }
    return null;
  };
}
