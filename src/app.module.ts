import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { MemberModule } from 'src/module/member.module';
import commonConfig from 'src/config/common.config';
import { AppController } from 'src/app.controller';
import { LoggerMiddleware } from 'src/log/logger.middleware';
import { RequestContext } from 'src/port/audit/request-context.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [commonConfig],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) =>
    //     TypeOrmConfig(configService),
    //   dataSourceFactory: async (options) => {
    //     if (!options) {
    //       throw new Error('Invalid options passed');
    //     }

    //     return addTransactionalDataSource(new DataSource(options));
    //   },
    //   inject: [ConfigService],
    // }),
    TerminusModule,
    MemberModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
      .apply(RequestContext)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
