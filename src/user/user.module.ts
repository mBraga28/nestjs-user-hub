import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
