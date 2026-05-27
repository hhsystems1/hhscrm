import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('ChatwootConversation')
export class ChatwootConversationType {
  @Field(() => Int)
  chatwootId: number;

  @Field({ nullable: true })
  contactEmail?: string;

  @Field({ nullable: true })
  contactName?: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  lastMessage?: string;

  @Field(() => Int)
  unreadCount: number;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
