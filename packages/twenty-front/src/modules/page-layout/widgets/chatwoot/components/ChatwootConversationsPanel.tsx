import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client/react';

import { useChatwootConversations, useChatwootConversationMessages } from '@/page-layout/widgets/chatwoot/hooks/useChatwootConversations';
import { SEND_CHATWOOT_MESSAGE } from '@/page-layout/widgets/chatwoot/graphql/mutations/mutations';
import { styled } from '@linaria/react';

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid rgb(var(--border-color));
  display: flex;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  padding: 12px 16px;
`;

const StyledConversationList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const StyledConversationItem = styled.div<{ isSelected: boolean }>`
  background: ${({ isSelected }) =>
    isSelected ? 'rgb(var(--background-300))' : 'transparent'};
  border-bottom: 1px solid rgb(var(--border-color));
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  transition: background 0.15s ease;

  &:hover {
    background: rgb(var(--background-200));
  }
`;

const StyledConversationHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const StyledContactName = styled.span`
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledStatusBadge = styled.span<{ status: string }>`
  background: ${({ status }) =>
    status === 'open' ? 'rgb(var(--green-100))' :
    status === 'pending' ? 'rgb(var(--yellow-100))' :
    'rgb(var(--gray-100))'};
  border-radius: 4px;
  color: ${({ status }) =>
    status === 'open' ? 'rgb(var(--green-700))' :
    status === 'pending' ? 'rgb(var(--yellow-700))' :
    'rgb(var(--gray-700))'};
  font-size: 11px;
  font-weight: 500;
  padding: 2px 6px;
  text-transform: capitalize;
`;

const StyledUnreadBadge = styled.span`
  align-items: center;
  background: rgb(var(--accent-500));
  border-radius: 10px;
  color: white;
  display: flex;
  font-size: 11px;
  font-weight: 600;
  height: 18px;
  justify-content: center;
  min-width: 18px;
  padding: 0 4px;
`;

const StyledLastMessage = styled.p`
  color: rgb(var(--text-secondary));
  font-size: 12px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledMessageThread = styled.div`
  border-bottom: 1px solid rgb(var(--border-color));
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: auto;
  padding: 12px 16px;
`;

const StyledMessage = styled.div<{ isOutgoing: boolean }>`
  align-self: ${({ isOutgoing }) => (isOutgoing ? 'flex-end' : 'flex-start')};
  background: ${({ isOutgoing }) =>
    isOutgoing ? 'rgb(var(--accent-100))' : 'rgb(var(--background-200))'};
  border-radius: 8px;
  margin-bottom: 6px;
  max-width: 80%;
  padding: 8px 12px;
`;

const StyledMessageContent = styled.p`
  font-size: 13px;
  margin: 0;
`;

const StyledMessageMeta = styled.span`
  color: rgb(var(--text-secondary));
  display: block;
  font-size: 10px;
  margin-top: 4px;
`;

const StyledReplyArea = styled.div`
  border-top: 1px solid rgb(var(--border-color));
  display: flex;
  gap: 8px;
  padding: 12px 16px;
`;

const StyledReplyInput = styled.input`
  border: 1px solid rgb(var(--border-color));
  border-radius: 6px;
  flex: 1;
  font-size: 13px;
  outline: none;
  padding: 8px 12px;

  &:focus {
    border-color: rgb(var(--accent-500));
  }
`;

const StyledSendButton = styled.button`
  background: rgb(var(--accent-500));
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: rgb(var(--gray-200));
    cursor: not-allowed;
  }
`;

const StyledEmptyState = styled.div`
  align-items: center;
  color: rgb(var(--text-secondary));
  display: flex;
  flex: 1;
  font-size: 13px;
  justify-content: center;
  padding: 32px;
`;

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

export const ChatwootConversationsPanel = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [replyText, setReplyText] = useState('');

  const { conversations, loading } = useChatwootConversations({});

  const { messages } = useChatwootConversationMessages({
    conversationId: selectedConversationId ?? undefined,
  });

  const [sendMessage] = useMutation(SEND_CHATWOOT_MESSAGE);

  const handleSelectConversation = useCallback(
    (conversationId: number) => {
      setSelectedConversationId(
        conversationId === selectedConversationId ? null : conversationId,
      );
      setReplyText('');
    },
    [selectedConversationId],
  );

  const handleSendReply = useCallback(async () => {
    if (!selectedConversationId || !replyText.trim()) return;

    await sendMessage({
      variables: {
        data: {
          conversationId: selectedConversationId,
          message: replyText.trim(),
        },
      },
    });

    setReplyText('');
  }, [selectedConversationId, replyText, sendMessage]);

  const [sending, setSending] = useState(false);

  const handleSend = useCallback(async () => {
    setSending(true);
    try {
      await handleSendReply();
    } finally {
      setSending(false);
    }
  }, [handleSendReply]);

  return (
    <StyledPanel>
      <StyledHeader>
        Conversations
        {conversations.length > 0 && (
          <span style={{ color: 'rgb(var(--text-secondary))', fontSize: 12 }}>
            ({conversations.length})
          </span>
        )}
      </StyledHeader>

      <StyledConversationList>
        {loading && <StyledEmptyState>Loading conversations...</StyledEmptyState>}

        {!loading && conversations.length === 0 && (
          <StyledEmptyState>No conversations found</StyledEmptyState>
        )}

        {!loading &&
          conversations.map((conv: ChatwootConversation) => (
            <div key={conv.chatwootId}>
              <StyledConversationItem
                isSelected={selectedConversationId === conv.chatwootId}
                onClick={() => handleSelectConversation(conv.chatwootId)}
              >
                <StyledConversationHeader>
                  <StyledContactName>
                    {conv.contactName || conv.contactEmail || 'Unknown'}
                  </StyledContactName>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <StyledStatusBadge status={conv.status}>
                      {conv.status}
                    </StyledStatusBadge>
                    {conv.unreadCount > 0 && (
                      <StyledUnreadBadge>
                        {conv.unreadCount}
                      </StyledUnreadBadge>
                    )}
                  </div>
                </StyledConversationHeader>
                {conv.lastMessage && (
                  <StyledLastMessage>
                    {conv.lastMessage}
                  </StyledLastMessage>
                )}
              </StyledConversationItem>

              {selectedConversationId === conv.chatwootId && (
                <>
                  <StyledMessageThread>
                    {messages.length === 0 && (
                      <StyledEmptyState>No messages</StyledEmptyState>
                    )}
                    {messages.map((msg) => (
                      <StyledMessage
                        key={msg.chatwootId}
                        isOutgoing={msg.messageType === 'outgoing' || msg.messageType === '1'}
                      >
                        <StyledMessageContent>
                          {msg.content}
                        </StyledMessageContent>
                        <StyledMessageMeta>
                          {msg.senderName || 'Unknown'} ·{' '}
                          {new Date(msg.createdAt).toLocaleString()}
                        </StyledMessageMeta>
                      </StyledMessage>
                    ))}
                  </StyledMessageThread>

                  <StyledReplyArea>
                    <StyledReplyInput
                      placeholder="Type a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    />
                    <StyledSendButton
                      onClick={handleSend}
                      disabled={!replyText.trim() || sending}
                    >
                      Send
                    </StyledSendButton>
                  </StyledReplyArea>
                </>
              )}
            </div>
          ))}
      </StyledConversationList>
    </StyledPanel>
  );
};
