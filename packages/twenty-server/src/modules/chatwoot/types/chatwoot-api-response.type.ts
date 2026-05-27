export type ChatwootConversationAPIResponse = {
  id: number;
  status: string;
  meta?: {
    sender?: {
      id?: number;
      email?: string;
      name?: string;
    };
  };
  last_non_activity_message?: string;
  unread_count?: number;
  created_at?: string;
  updated_at?: string;
};

export type ChatwootMessageAPIResponse = {
  id: number;
  content: string;
  message_type: number;
  sender?: {
    id?: number;
    name?: string;
    type?: string;
  };
  conversation_id?: number;
  created_at?: number;
};

export type ChatwootAPIListResponse<T> = {
  data?: {
    payload?: T[];
  };
};
