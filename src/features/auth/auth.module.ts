import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.services';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserGqlMapper } from '../users/presentation/graphql/object-mapper/user.gql.mapper';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'this-is-my-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    PrismaService,
    UserGqlMapper,
  ],
  exports: [AuthService],
})
export class AuthModule {}
