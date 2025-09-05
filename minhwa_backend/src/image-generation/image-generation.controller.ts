// src/image-generation/image-generation.controller.ts

import { Controller, Post, Body, Get, Param, ValidationPipe } from '@nestjs/common';
import { ImageGenerationService } from './image-generation.service';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { JobStatusDto } from './dto/job-status.dto';

@Controller('image-generation')
export class ImageGenerationController {
  constructor(
    private readonly generationService: ImageGenerationService,
  ) {}

  /**
   * 이미지 생성을 요청합니다.
   * @param createDto - { prompt: string }
   * @returns 생성된 작업의 ID
   */
  @Post('generate')
  async startGeneration(
    @Body(new ValidationPipe()) createDto: CreateGenerationDto,
  ): Promise<{ jobId: string }> {
    return this.generationService.startGeneration(createDto);
  }

  /**
   * 지정된 ID의 작업 상태를 조회합니다.
   * @param jobId - 작업 ID
   * @returns 작업 상태 정보
   */
  @Get('status/:jobId')
  async getStatus(@Param('jobId') jobId: string): Promise<JobStatusDto> {
    return this.generationService.getJobStatus(jobId);
  }
}