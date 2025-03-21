import { registerEnumType } from '@nestjs/graphql';

export enum EventType {
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
}

registerEnumType(EventType, { name: 'EventType', description: undefined });
