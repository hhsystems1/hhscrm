import { Field, InputType, Int } from '@nestjs/graphql';

import { IsInt, IsString } from 'class-validator';

@InputType()
export class SendChatwootMessageInput {
  @Field(() => Int)
  @IsInt()
  conversationId: number;

  @Field()
  @IsString()
  message: string;
}
