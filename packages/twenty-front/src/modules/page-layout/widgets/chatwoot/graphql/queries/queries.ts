import { gql } from '@apollo/client';

export const GET_CHATWOOT_CONVERSATIONS = gql`
  query GetChatwootConversations($status: String, $inboxId: Float) {
    chatwootConversations(status: $status, inboxId: $inboxId) {
      chatwootId
      contactEmail
      contactName
      status
      lastMessage
      unreadCount
      createdAt
      updatedAt
    }
  }
`;

export const GET_CHATWOOT_CONVERSATION_MESSAGES = gql`
  query GetChatwootConversationMessages($conversationId: Float!) {
    chatwootConversationMessages(conversationId: $conversationId) {
      chatwootId
      content
      messageType
      senderName
      senderType
      createdAt
      conversationId
    }
  }
`;
