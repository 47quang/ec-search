import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Indices } from 'src/constants/indices';
import { TagDto } from 'src/modules/tag/dtos/tag.dto';
import * as _ from 'lodash';

@Injectable()
export class TagService {
  constructor(private readonly esService: ElasticsearchService) {}

  async create(createDto: TagDto) {
    const { id } = createDto;

    await this.esService.create({ index: Indices.TAG, id, body: createDto });

    return createDto;
  }

  public async get(id: string) {
    try {
      const response = await this.esService.get({ index: Indices.TAG, id });
      return _.get(response, 'body._source', {});
    } catch (error) {
      return {};
    }
  }

  public async update(id: string, updateDto: TagDto) {
    await this.esService.update({
      index: Indices.TAG,
      id,
      body: {
        doc: updateDto,
      },
    });

    return updateDto;
  }

  public async delete(id: string) {
    const response = await this.esService.delete({ index: Indices.TAG, id });
    return _.get(response, 'statusCode');
  }
}
