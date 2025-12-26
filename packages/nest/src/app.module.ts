import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { LoggerModule } from "nestjs-pino";
import pino from "pino";

@Module({
  imports: [
    AuthModule,
    UserModule,
    LoggerModule.forRoot({
      pinoHttp: {
        stream: pino.destination({
          dest: "./logs/app.log",
          minLength: 0,
          maxLength: 1024,
          sync: false,
          mkdir: true,
        }),
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
