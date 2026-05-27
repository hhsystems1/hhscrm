import { Module } from '@nestjs/common';

import { WorkspaceModule } from 'src/engine/core-modules/workspace/workspace.module';
import { MessageQueueModule } from 'src/engine/core-modules/message-queue/message-queue.module';

import { ChatwootApiClientService } from 'src/modules/chatwoot/services/chatwoot-api-client.service';
import { ChatwootWebhookDispatcherService } from 'src/modules/chatwoot/services/chatwoot-webhook-dispatcher.service';
import { ChatwootResolver } from 'src/modules/chatwoot/resolvers/chatwoot.resolver';
import { ChatwootWebhookController } from 'src/modules/chatwoot/controllers/chatwoot-webhook.controller';
import { ChatwootProcessWebhookJob } from 'src/modules/chatwoot/jobs/chatwoot-process-webhook.job';

@Module({
  imports: [WorkspaceModule, MessageQueueModule],
  controllers: [ChatwootWebhookController],
  providers: [
    ChatwootApiClientService,
    ChatwootWebhookDispatcherService,
    ChatwootResolver,
    ChatwootProcessWebhookJob,
  ],
  exports: [ChatwootProcessWebhookJob],
})
export class ChatwootModule {}
