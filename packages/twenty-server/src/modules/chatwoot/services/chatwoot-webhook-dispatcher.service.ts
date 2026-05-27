import { Injectable, Logger } from '@nestjs/common';

import { InjectMessageQueue } from 'src/engine/core-modules/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/core-modules/message-queue/services/message-queue.service';
import {
  ChatwootProcessWebhookJob,
  type ChatwootProcessWebhookJobData,
} from 'src/modules/chatwoot/jobs/chatwoot-process-webhook.job';

@Injectable()
export class ChatwootWebhookDispatcherService {
  private readonly logger = new Logger(ChatwootWebhookDispatcherService.name);

  constructor(
    @InjectMessageQueue(MessageQueue.chatwootQueue)
    private readonly messageQueueService: MessageQueueService,
  ) {}

  async dispatchWebhook(data: ChatwootProcessWebhookJobData) {
    await this.messageQueueService.add<ChatwootProcessWebhookJobData>(
      ChatwootProcessWebhookJob.name,
      data,
    );
  }
}
