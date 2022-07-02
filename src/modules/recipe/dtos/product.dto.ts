import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  data_source: string;

  @IsDefined()
  @IsString()
  data_source_url: string;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  created_at: Date;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  updated_at: Date;
}
