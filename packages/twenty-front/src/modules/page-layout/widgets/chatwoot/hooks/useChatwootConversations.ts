import { useQuery } from '@apollo/client/react';

import {
  GET_CHATWOOT_CONVERSATIONS,
  GET_CHATWOOT_CONVERSATION_MESSAGES,
} from '@/page-layout/widgets/chatwoot/graphql/queries/queries';

type ChatwootConversation = {
  chatwootId: number;
  contactEmail: string | null;
  contactName: string | null;
  status: string;
  lastMessage: string | null;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
};

type ChatwootMessage = {
  chatwootId: number;
  content: string;
  messageType: string;
  senderName: string | null;
  senderType: string | null;
  createdAt: string;
  conversationId: number;
};

export const useChatwootConversations = ({
  status,
  inboxId,
  skip,
}: {
  status?: string;
  inboxId?: number;
  skip?: boolean;
}) => {
  const { data, loading, error, refetch } = useQuery(
    GET_CHATWOOT_CONVERSATIONS,
    {
      variables: { status: status ?? null, inboxId: inboxId ?? null },
      skip,
      fetchPolicy: 'network-only',
    },
  );

  return {
    conversations: (data?.chatwootConversations ??
      []) as ChatwootConversation[],
    loading,
    error,
    refetch,
  };
};

export const useChatwootConversationMessages = ({
  conversationId,
  skip,
}: {
  conversationId?: number;
  skip?: boolean;
}) => {
  const { data, loading, error } = useQuery(
    GET_CHATWOOT_CONVERSATION_MESSAGES,
    {
      variables: { conversationId },
      skip: skip || !conversationId,
      fetchPolicy: 'network-only',
    },
  );

  return {
    messages: (data?.chatwootConversationMessages ??
      []) as ChatwootMessage[],
    loading,
    error,
  };
};
