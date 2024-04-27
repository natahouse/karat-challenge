import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';

import { Logger } from '@nestjs/common';
import { queueNames } from 'src/constants/queues';
import { CreateAuthorizationFromEventService } from '..';
import { AuthorizationEventEntity } from '../../entities';

type JobData = AuthorizationEventEntity;

@Processor(queueNames.AUTHORIZATION_QUEUE_NAME)
export class AuthorizationEventConsumer {
  private logger = new Logger(AuthorizationEventConsumer.name);

  constructor(
    private readonly createAuthorizationFromEventService: CreateAuthorizationFromEventService,
  ) {}

  @Process()
  async processData(job: Job<JobData>) {
    try {
      const event = job.data;
      await this.createAuthorizationFromEventService.execute(event);
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  @OnQueueActive()
  onActive(job: Job<JobData>) {
    this.logger.debug(`Starting job ${job.id}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job<JobData>) {
    this.logger.debug(`Job ${job.id} has been finished`);
  }
}
