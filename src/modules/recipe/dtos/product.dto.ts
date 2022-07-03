import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  data_source: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  data_source_url: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  created_at: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  updated_at: Date;
}
