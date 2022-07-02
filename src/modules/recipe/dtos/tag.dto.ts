import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class TagDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  type: string;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  created_at: Date;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  updated_at: Date;
}
