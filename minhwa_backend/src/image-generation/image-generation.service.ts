// src/image-generation/image-generation.service.ts

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { CreateGenerationDto } from './dto/create-generation.dto';
import { JobStatusDto } from './dto/job-status.dto';

@Injectable()
export class ImageGenerationService {
  private readonly logger = new Logger(ImageGenerationService.name);
  private readonly sqsClient: SQSClient;
  private readonly dynamoDbClient: DynamoDBClient;
  private readonly queueUrl: string;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');

    this.sqsClient = new SQSClient({ region });
    this.dynamoDbClient = new DynamoDBClient({ region });
    this.queueUrl = this.configService.get<string>('SQS_QUEUE_URL');
    this.tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME');
  }

  async startGeneration(
    createDto: CreateGenerationDto,
  ): Promise<{ jobId: string }> {
    const jobId = uuidv4();
    const { prompt } = createDto;

    this.logger.log(`[JobId: ${jobId}] Starting generation for prompt: ${prompt}`);

    // 1. DynamoDB에 작업 초기 상태(PENDING) 기록
    const putItemCommand = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall({
        jobId: jobId,
        jobStatus: 'PENDING',
        prompt: prompt,
        createdAt: new Date().toISOString(),
      }),
    });
    await this.dynamoDbClient.send(putItemCommand);
    this.logger.log(`[JobId: ${jobId}] Job status set to PENDING in DynamoDB.`);

    // 2. SQS 큐에 작업 메시지 전송
    const sendMessageCommand = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify({
        jobId: jobId,
        prompt: prompt,
      }),
    });
    await this.sqsClient.send(sendMessageCommand);
    this.logger.log(`[JobId: ${jobId}] Message sent to SQS queue.`);

    return { jobId };
  }

  async getJobStatus(jobId: string): Promise<JobStatusDto> {
    this.logger.log(`Checking status for JobId: ${jobId}`);

    const getItemCommand = new GetItemCommand({
      TableName: this.tableName,
      Key: marshall({ jobId }),
    });

    const { Item } = await this.dynamoDbClient.send(getItemCommand);

    if (!Item) {
      this.logger.warn(`JobId not found: ${jobId}`);
      throw new NotFoundException(`Job with ID "${jobId}" not found.`);
    }

    const unmarshalledItem = unmarshall(Item);
    
    return {
        jobId: unmarshalledItem.jobId,
        jobStatus: unmarshalledItem.jobStatus,
        prompt: unmarshalledItem.prompt,
        createdAt: unmarshalledItem.createdAt,
        s3ImageUrl: unmarshalledItem.s3ImageUrl,
    };
  }
}