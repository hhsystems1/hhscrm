import {
  BadRequestException,
  Controller,
  HttpCode,
  Logger,
  Param,
  Post,
  type RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';

import { type Request } from 'express';

import { NoPermissionGuard } from 'src/engine/guards/no-permission.guard';
import { PublicEndpointGuard } from 'src/engine/guards/public-endpoint.guard';
import { ChatwootWebhookDispatcherService } from 'src/modules/chatwoot/services/chatwoot-webhook-dispatcher.service';

@Controller()
export class ChatwootWebhookController {
  private readonly logger = new Logger(ChatwootWebhookController.name);

  constructor(
    private readonly chatwootWebhookDispatcherService: ChatwootWebhookDispatcherService,
  ) {}

  @Post(['webhooks/chatwoot/:workspaceId'])
  @UseGuards(PublicEndpointGuard, NoPermissionGuard)
  @HttpCode(200)
  async handleChatwootWebhook(
    @Param('workspaceId') workspaceId: string,
    @Req() request: RawBodyRequest<Request>,
  ) {
    if (!request.rawBody) {
      throw new BadRequestException('Missing webhook payload');
    }

    let payload: Record<string, unknown>;

    try {
      payload = JSON.parse(request.rawBody.toString('utf8'));
    } catch {
      throw new BadRequestException('Invalid webhook payload');
    }

    await this.chatwootWebhookDispatcherService.dispatchWebhook({
      workspaceId,
      payload,
    });
  }
}
