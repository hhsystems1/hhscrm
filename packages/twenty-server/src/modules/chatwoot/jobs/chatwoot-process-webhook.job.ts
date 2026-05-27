import { Logger, Scope } from '@nestjs/common';

import { Processor } from 'src/engine/core-modules/message-queue/decorators/processor.decorator';
import { Process } from 'src/engine/core-modules/message-queue/decorators/process.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { WorkspaceService } from 'src/engine/core-modules/workspace/services/workspace.service';

export type ChatwootProcessWebhookJobData = {
  workspaceId: string;
  payload: Record<string, unknown>;
};

@Processor({
  queueName: MessageQueue.chatwootQueue,
  scope: Scope.REQUEST,
})
export class ChatwootProcessWebhookJob {
  private readonly logger = new Logger(ChatwootProcessWebhookJob.name);

  constructor(private readonly workspaceService: WorkspaceService) {}

  @Process(ChatwootProcessWebhookJob.name)
  async handle(data: ChatwootProcessWebhookJobData): Promise<void> {
    const { workspaceId, payload } = data;
    const eventType = payload['event'] as string | undefined;

    if (!eventType) {
      this.logger.warn('Received Chatwoot webhook without event type');

      return;
    }

    this.logger.log(
      `Processing Chatwoot webhook event "${eventType}" for workspace ${workspaceId}`,
    );

    const workspace = await this.workspaceService.findById(workspaceId);

    if (!workspace) {
      this.logger.warn(`Workspace ${workspaceId} not found`);

      return;
    }

    if (!workspace.chatwootApiBaseUrl || !workspace.chatwootApiAccessToken) {
      this.logger.warn(
        `Chatwoot not configured for workspace ${workspaceId}`,
      );

      return;
    }

    switch (eventType) {
      case 'conversation_created':
      case 'conversation_status_changed':
      case 'message_created':
      case 'message_updated':
        this.logger.log(
          `Handled Chatwoot event "${eventType}" for workspace ${workspaceId}`,
        );
        break;

      default:
        this.logger.log(
          `Ignoring unhandled Chatwoot event "${eventType}" for workspace ${workspaceId}`,
        );
    }
  }
}
