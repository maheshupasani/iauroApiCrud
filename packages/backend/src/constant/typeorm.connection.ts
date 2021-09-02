import { User } from '../entities/user-entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import {
  ConfigService,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from '../config/config.service';
import { Product } from '../entities/product-entity';
import { TokenCache } from '../entities/token-cache-entity';
export const DEFAULT = 'default';

export function connectTypeORM(config: ConfigService): MysqlConnectionOptions {
  return {
    type: 'mysql',
    host: config.get(MYSQL_HOST),
    port: 3306,
    username: config.get(MYSQL_USER),
    password: config.get(MYSQL_PASSWORD),
    database: config.get(MYSQL_DATABASE),
    entities: [User, Product, TokenCache],
    synchronize: true,
    logging: false,
  };
}
