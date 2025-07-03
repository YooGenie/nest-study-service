import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MemberAuditSubscriber } from 'src/port/audit/member-audit.subscriber';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function TypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  const nodeEnv = configService.get<string>('NODE_ENV');

  // const defaultOptions: TypeOrmModuleOptions = {
  //   type: 'postgres',
  //   host: configService.get<string>('DB_HOST'),
  //   port: parseInt(configService.get<string>('DB_PORT') || '5432'),
  //   username: configService.get<string>('DB_USERNAME'),
  //   password: configService.get<string>('DB_PASSWORD'),
  //   database: configService.get<string>('DB_NAME'),
  //   schema: configService.get<string>('DB_SCHEMA'),
  //   entities: [__dirname + '/../domain/**/*.entity{.ts,.js}'],
  //   subscribers: [MemberAuditSubscriber],
  //   namingStrategy: new SnakeNamingStrategy(),
  //   synchronize: nodeEnv === 'production' ? false : true,
  //   logging: process.env.TYPEORM_LOGGING === 'true',
  //   retryAttempts: 3,
  //   retryDelay: 3000,
  //   useUTC: true,
  // };

  const defaultOptions: TypeOrmModuleOptions = {
    // type: 'postgres',
    // host: configService.get<string>('DB_HOST'),
    // port: parseInt(configService.get<string>('DB_PORT') || '5432'),
    // username: configService.get<string>('DB_USERNAME'),
    // password: configService.get<string>('DB_PASSWORD'),
    // database: configService.get<string>('DB_NAME'),
    // schema: configService.get<string>('DB_SCHEMA'),
    // entities: [__dirname + '/../domain/**/*.entity{.ts,.js}'],
    // subscribers: [MemberAuditSubscriber],
    // namingStrategy: new SnakeNamingStrategy(),
    // synchronize: nodeEnv === 'production' ? false : true,
    // logging: process.env.TYPEORM_LOGGING === 'true',
    // retryAttempts: 3,
    // retryDelay: 3000,
    // useUTC: true,
  };

  const testOptions: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/../domain/**/*.entity{.ts,.js}'],
    subscribers: [MemberAuditSubscriber],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    logging: process.env.TYPEORM_LOGGING === 'true',
    autoLoadEntities: true,
    retryAttempts: 3,
    retryDelay: 3000,
  };

  const typeOrmModuleOption = nodeEnv === 'test' ? testOptions : defaultOptions;

  return typeOrmModuleOption;
}
