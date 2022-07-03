import { IsArray, IsDate, IsDefined, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CategoryDto } from 'src/modules/recipe/dtos/category.dto';
import { TagDto } from 'src/modules/recipe/dtos/tag.dto';
import { ProductDto } from 'src/modules/recipe/dtos/product.dto';
import { AuthorDto } from 'src/modules/recipe/dtos/author.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecipeDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  thumbnail: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  content: string;

  @ApiProperty({ type: CategoryDto })
  @IsDefined()
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @ApiProperty({ type: AuthorDto })
  @IsDefined()
  @ValidateNested()
  @Type(() => AuthorDto)
  author: AuthorDto;

  @ApiProperty({ type: [TagDto] })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => TagDto)
  tags: TagDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nutrition: string;

  @ApiProperty({ type: [ProductDto] })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => ProductDto)
  products: ProductDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  views: number;

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
