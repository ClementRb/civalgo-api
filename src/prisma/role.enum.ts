import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  WORKER = 'WORKER',
  SUPERVISOR = 'SUPERVISOR',
}

registerEnumType(Role, { name: 'Role', description: undefined });
