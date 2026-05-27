import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('ChatwootMessage')
export class ChatwootMessageType {
  @Field(() => Int)
  chatwootId: number;

  @Field()
  content: string;

  @Field()
  messageType: string;

  @Field({ nullable: true })
  senderName?: string;

  @Field({ nullable: true })
  senderType?: string;

  @Field()
  createdAt: string;

  @Field(() => Int, { nullable: true })
  conversationId?: number;
}
