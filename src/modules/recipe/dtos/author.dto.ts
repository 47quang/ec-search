import { Transform } from 'class-transformer';
import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator';

export class AuthorDto {
  @IsDefined()
  @IsString()
  id: string;

  @IsDefined()
  @IsString()
  user_id: string;

  @IsDefined()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  created_at: Date;

  @IsOptional()
  @Transform((v) => new Date(v))
  @IsDate()
  updated_at: Date;
}
