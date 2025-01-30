import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { RedisModule } from "./redis/redis.module";
import { EmailModule } from "./email/email.module";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { FriendshipModule } from "./friendship/friendship.module";
import { PrismaService } from "./prisma/prisma.service";
import { ChatroomModule } from "./chatroom/chatroom.module";
import { ConfigModule } from "@nestjs/config";
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    RedisModule,
    EmailModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: "natchen",
          signOptions: {
            expiresIn: "30m", // 默认 30 分钟
          },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ".env",
    }),
    FriendshipModule,
    ChatroomModule,
    MinioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
