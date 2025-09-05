// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageGenerationModule } from './image-generation/image-generation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 ConfigService를 사용할 수 있도록 설정
      envFilePath: '.env', // .env 파일을 사용
    }),
    ImageGenerationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}