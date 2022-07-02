import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CategoryDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  created_at: Date;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  updated_at: Date;
}
