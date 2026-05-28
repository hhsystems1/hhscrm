import { gql } from '@apollo/client';

export const SEND_CHATWOOT_MESSAGE = gql`
  mutation SendChatwootMessage($data: SendChatwootMessageInput!) {
    sendChatwootMessage(data: $data)
  }
`;

export const TOGGLE_CHATWOOT_CONVERSATION_STATUS = gql`
  mutation ToggleChatwootConversationStatus(
    $data: ToggleChatwootConversationStatusInput!
  ) {
    toggleChatwootConversationStatus(data: $data)
  }
`;
