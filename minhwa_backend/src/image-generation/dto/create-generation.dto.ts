// src/image-generation/dto/create-generation.dto.ts

import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateGenerationDto {
  @IsString({ message: '프롬프트는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '프롬프트는 비어 있을 수 없습니다.' })
  @MinLength(10, { message: '프롬프트는 최소 10자 이상이어야 합니다.' })
  prompt: string;
}