import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator';

export class AuthorDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  id: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;

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
