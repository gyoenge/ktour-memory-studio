// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DTO 유효성 검사를 위한 Global Pipe 설정
  app.useGlobalPipes(new ValidationPipe());

  // --- Swagger 설정 추가 ---
  const config = new DocumentBuilder()
    .setTitle('Minhwa Image Generation API')
    .setDescription('민화 스타일 이미지 생성 요청을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addTag('image-generation', '이미지 생성 관련 API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' 경로로 Swagger UI를 생성
  // -------------------------

  await app.listen(3000);
}
bootstrap();