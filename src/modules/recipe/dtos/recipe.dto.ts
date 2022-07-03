import { IsArray, IsDate, IsDefined, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CategoryDto } from 'src/modules/recipe/dtos/category.dto';
import { TagDto } from 'src/modules/recipe/dtos/tag.dto';
import { ProductDto } from 'src/modules/recipe/dtos/product.dto';
import { AuthorDto } from 'src/modules/recipe/dtos/author.dto';

export class RecipeDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  thumbnail: string;

  @IsDefined()
  @IsString()
  content: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => AuthorDto)
  author: AuthorDto;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => TagDto)
  tags: TagDto[];

  @IsOptional()
  @IsString()
  nutrition: string;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsOptional()
  @IsNumber()
  views: number;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  created_at: Date;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  updated_at: Date;
}
