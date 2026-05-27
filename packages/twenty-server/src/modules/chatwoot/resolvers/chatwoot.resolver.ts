import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { WorkspaceAuthGuard } from 'src/engine/guards/workspace-auth.guard';
import { AuthWorkspace } from 'src/engine/decorators/auth/auth-workspace.decorator';
import { WorkspaceEntity } from 'src/engine/core-modules/workspace/workspace.entity';
import { ChatwootApiClientService } from 'src/modules/chatwoot/services/chatwoot-api-client.service';
import { ChatwootConversationType } from 'src/modules/chatwoot/dtos/chatwoot-conversation.type';
import { ChatwootMessageType } from 'src/modules/chatwoot/dtos/chatwoot-message.type';
import { SendChatwootMessageInput } from 'src/modules/chatwoot/dtos/send-chatwoot-message.input';
import { ToggleChatwootConversationStatusInput } from 'src/modules/chatwoot/dtos/toggle-chatwoot-conversation-status.input';
import { NoPermissionGuard } from 'src/engine/guards/no-permission.guard';

type ChatwootSender = {
  email?: string;
  name?: string;
  type?: string;
};

type ChatwootConversationPayload = {
  id?: number;
  status?: string;
  meta?: { sender?: ChatwootSender };
  last_non_activity_message?: string;
  unread_count?: number;
  created_at?: string;
  updated_at?: string;
};

type ChatwootMessagePayload = {
  id?: number;
  content?: string;
  message_type?: number;
  sender?: ChatwootSender;
  conversation_id?: number;
  created_at?: string;
};

type ChatwootListResponse<T> = {
  data?: { payload?: T[] };
};

@Resolver()
@UseGuards(WorkspaceAuthGuard, NoPermissionGuard)
export class ChatwootResolver {
  constructor(
    private readonly chatwootApiClientService: ChatwootApiClientService,
  ) {}

  @Query(() => [ChatwootConversationType])
  async chatwootConversations(
    @AuthWorkspace() workspace: WorkspaceEntity,
    @Args('status', { nullable: true }) status?: string,
    @Args('inboxId', { nullable: true, type: () => Number })
    inboxId?: number,
  ) {
    if (!workspace.chatwootApiBaseUrl || !workspace.chatwootApiAccessToken) {
      return [];
    }

    const client = await this.chatwootApiClientService.buildClient({
      apiBaseUrl: workspace.chatwootApiBaseUrl,
      apiAccessToken: workspace.chatwootApiAccessToken,
      accountId: workspace.chatwootAccountId ?? '',
    });

    const response = await this.chatwootApiClientService.listConversations(
      client,
      workspace.chatwootAccountId ?? '',
      { status, inboxId: inboxId ?? undefined },
    );

    const typedResponse = response as ChatwootListResponse<ChatwootConversationPayload>;

    return (typedResponse?.data?.payload ?? []).map((conv) => ({
      chatwootId: conv.id ?? 0,
      contactEmail: conv.meta?.sender?.email ?? null,
      contactName: conv.meta?.sender?.name ?? null,
      status: conv.status ?? 'unknown',
      lastMessage: conv.last_non_activity_message ?? null,
      unreadCount: conv.unread_count ?? 0,
      createdAt: conv.created_at ?? '',
      updatedAt: conv.updated_at ?? '',
    }));
  }

  @Query(() => [ChatwootMessageType])
  async chatwootConversationMessages(
    @AuthWorkspace() workspace: WorkspaceEntity,
    @Args('conversationId', { type: () => Number }) conversationId: number,
  ) {
    if (!workspace.chatwootApiBaseUrl || !workspace.chatwootApiAccessToken) {
      return [];
    }

    const client = await this.chatwootApiClientService.buildClient({
      apiBaseUrl: workspace.chatwootApiBaseUrl,
      apiAccessToken: workspace.chatwootApiAccessToken,
      accountId: workspace.chatwootAccountId ?? '',
    });

    const response = await this.chatwootApiClientService.listMessages(
      client,
      workspace.chatwootAccountId ?? '',
      conversationId,
    );

    const typedResponse = response as ChatwootListResponse<ChatwootMessagePayload>;

    return (typedResponse?.data?.payload ?? []).map((msg) => ({
      chatwootId: msg.id ?? 0,
      content: msg.content ?? '',
      messageType: String(msg.message_type ?? ''),
      senderName: msg.sender?.name ?? null,
      senderType: msg.sender?.type ?? null,
      createdAt: msg.created_at ?? '',
      conversationId: msg.conversation_id ?? 0,
    }));
  }

  @Mutation(() => Boolean)
  async sendChatwootMessage(
    @AuthWorkspace() workspace: WorkspaceEntity,
    @Args('data') data: SendChatwootMessageInput,
  ) {
    if (!workspace.chatwootApiBaseUrl || !workspace.chatwootApiAccessToken) {
      return false;
    }

    const client = await this.chatwootApiClientService.buildClient({
      apiBaseUrl: workspace.chatwootApiBaseUrl,
      apiAccessToken: workspace.chatwootApiAccessToken,
      accountId: workspace.chatwootAccountId ?? '',
    });

    await this.chatwootApiClientService.sendMessage(
      client,
      workspace.chatwootAccountId ?? '',
      data.conversationId,
      data.message,
    );

    return true;
  }

  @Mutation(() => Boolean)
  async toggleChatwootConversationStatus(
    @AuthWorkspace() workspace: WorkspaceEntity,
    @Args('data') data: ToggleChatwootConversationStatusInput,
  ) {
    if (!workspace.chatwootApiBaseUrl || !workspace.chatwootApiAccessToken) {
      return false;
    }

    const client = await this.chatwootApiClientService.buildClient({
      apiBaseUrl: workspace.chatwootApiBaseUrl,
      apiAccessToken: workspace.chatwootApiAccessToken,
      accountId: workspace.chatwootAccountId ?? '',
    });

    await this.chatwootApiClientService.toggleConversationStatus(
      client,
      workspace.chatwootAccountId ?? '',
      data.conversationId,
      data.status,
    );

    return true;
  }
}
