import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { IsArray } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly color: string;
}
