import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnGlobalQueueError,
} from '@nestjs/bull';
import { Job } from 'bull';

import { Logger } from '@nestjs/common';
import { queueNames } from 'src/constants/queues';
import { CreateTransactionFromEventService } from '..';
import { TransactionEventEntity } from '../../entities';

type JobData = TransactionEventEntity;

@Processor(queueNames.TRANSACTION_QUEUE_NAME)
export class TransactionEventConsumer {
  private logger = new Logger(TransactionEventConsumer.name);

  constructor(
    private readonly createTransactionFromEventService: CreateTransactionFromEventService,
  ) {}

  @Process()
  async processData(job: Job<JobData>) {
    try {
      const event = job.data;
      await this.createTransactionFromEventService.execute(event);
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

  @OnGlobalQueueError()
  onError(job: Job<JobData>) {
    this.logger.error(`Job ${job.id} has failed`);
  }
}
