import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import * as _ from 'lodash';
import { SortEnum } from 'src/constants/indices';

export class SearchParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Transform((v) => searchify(v)) // need to nomalize before executing it with elasticsearch
  q?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((v) => Number(v))
  @IsNumber()
  page?: number = 0;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((v) => Number(v))
  @IsNumber()
  perpage?: number = 10;

  @ApiPropertyOptional({
    type: 'enum',
    enum: SortEnum,
  })
  @IsOptional()
  @IsIn([SortEnum.BY_CREATED_AT, SortEnum.BY_VIEWS])
  @IsString()
  sort?: SortEnum = SortEnum.BY_CREATED_AT; // default sort by created at

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((v) => (_.isString(v) ? v.split(',') : v))
  @IsArray()
  @IsString({ each: true })
  tagIds?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((v) => (_.isString(v) ? v.split(',') : v))
  @IsArray()
  @IsString({ each: true })
  ids?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((v) => (_.isString(v) ? v === 'true' : v))
  @IsBoolean()
  fuzzy?: boolean;
}

/**
 * nomalize for q search
 * @param query
 * @param enablePlusCharacterSearch
 * @returns
 */
const searchify = (query: string, enablePlusCharacterSearch = false) => {
  query = typeof query == 'string' ? query.trim().toLowerCase() : null;
  if (query) {
    // Replace + symbol with space
    if (!enablePlusCharacterSearch) query = query.replace(/\+/g, ' ');
    // Remove HTML Special characters
    query = query.replace(/&#?[a-z0-9]+;/g, ' ');
    // Remove HTML Tags
    query = query.replace(/<\/?[^>]+(>|$)/g, '');
    // remove allowed special characters but stand alone
    query = query.replace(/(\s+|^)([~`+-\-!@$%^&*()_={}[\]|:;"'<>,.?/\\\s]+)(\s+|$)/g, ' ').replace(/\s\s+/g, ' ');
    return query;
  } else {
    return null;
  }
};
