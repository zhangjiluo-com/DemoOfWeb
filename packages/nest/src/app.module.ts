import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AuthGuard } from './auth/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from './user/user.module'
import { LoggerModule } from 'nestjs-pino'
import pino from 'pino'
import { IS_DEV } from './config/constants'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/entities/user.entity'
import { SetupModule } from './setup/setup.module'
import { RoleModule } from './role/role.module'
import { PermissionModule } from './permission/permission.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: './db.sqlite',
      autoSave: true,
      extra: {
        readOnly: false,
      },

      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    }),
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: "localhost",
    //   port: 5432,
    //   username: "postgres",
    //   password: "zc",
    //   database: "test_zc",

    //   autoLoadEntities: true,
    //   synchronize: true,
    //   logging: true,
    //   logger: "advanced-console",
    // }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            IS_DEV
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                  },
                }
              : {
                  target: 'pino-roll',
                  options: {
                    file: './logs/app',
                    dateFormat: 'yyyy-MM-dd.hh',
                    frequency: 'hourly',
                    maxSize: '5m',
                    limit: {
                      count: 1000,
                    },
                    mkdir: true,
                  },
                },
          ],
        },
      },
    }),
    SetupModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
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
