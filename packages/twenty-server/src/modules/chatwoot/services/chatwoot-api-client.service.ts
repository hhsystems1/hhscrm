import { Injectable, Logger } from '@nestjs/common';

import axios, { type AxiosInstance } from 'axios';

@Injectable()
export class ChatwootApiClientService {
  private readonly logger = new Logger(ChatwootApiClientService.name);

  async buildClient(args: {
    apiBaseUrl: string;
    apiAccessToken: string;
    accountId: string;
  }): Promise<AxiosInstance> {
    const { apiBaseUrl, apiAccessToken, accountId } = args;

    const baseURL = `${apiBaseUrl.replace(/\/$/, '')}/api/v1`;

    const client = axios.create({
      baseURL,
      headers: {
        'api_access_token': apiAccessToken,
        'Content-Type': 'application/json',
      },
    });

    return client;
  }

  async listConversations(
    client: AxiosInstance,
    accountId: string,
    args?: { status?: string; page?: number; inboxId?: number },
  ) {
    const params: Record<string, string | number> = {
      account_id: accountId,
    };

    if (args?.status) {
      params.status = args.status;
    }

    if (args?.page) {
      params.page = args.page;
    }

    if (args?.inboxId) {
      params.inbox_id = args.inboxId;
    }

    try {
      const response = await client.get(
        `/accounts/${accountId}/conversations`,
        { params },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to list Chatwoot conversations', error);

      throw error;
    }
  }

  async getConversation(
    client: AxiosInstance,
    accountId: string,
    conversationId: number,
  ) {
    try {
      const response = await client.get(
        `/accounts/${accountId}/conversations/${conversationId}`,
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        `Failed to get Chatwoot conversation ${conversationId}`,
        error,
      );

      throw error;
    }
  }

  async listMessages(
    client: AxiosInstance,
    accountId: string,
    conversationId: number,
  ) {
    try {
      const response = await client.get(
        `/accounts/${accountId}/conversations/${conversationId}/messages`,
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        `Failed to list messages for Chatwoot conversation ${conversationId}`,
        error,
      );

      throw error;
    }
  }

  async sendMessage(
    client: AxiosInstance,
    accountId: string,
    conversationId: number,
    message: string,
  ) {
    try {
      const response = await client.post(
        `/accounts/${accountId}/conversations/${conversationId}/messages`,
        {
          content: message,
          message_type: 'outgoing',
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        `Failed to send message to Chatwoot conversation ${conversationId}`,
        error,
      );

      throw error;
    }
  }

  async toggleConversationStatus(
    client: AxiosInstance,
    accountId: string,
    conversationId: number,
    status: string,
  ) {
    try {
      const response = await client.post(
        `/accounts/${accountId}/conversations/${conversationId}/toggle_status`,
        { status },
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        `Failed to toggle status for Chatwoot conversation ${conversationId}`,
        error,
      );

      throw error;
    }
  }
}
