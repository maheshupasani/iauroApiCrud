import { AuthAggregateService } from './auth-aggregate/auth-aggregate.service';
import { UserAggregateService } from './user-aggregate/user-aggregate.service';

export const AuthAggregatesManager = [
  AuthAggregateService,
  UserAggregateService,
];
