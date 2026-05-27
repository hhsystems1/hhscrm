import { Field, InputType, Int } from '@nestjs/graphql';

import { IsInt, IsString } from 'class-validator';

@InputType()
export class ToggleChatwootConversationStatusInput {
  @Field(() => Int)
  @IsInt()
  conversationId: number;

  @Field()
  @IsString()
  status: string;
}
