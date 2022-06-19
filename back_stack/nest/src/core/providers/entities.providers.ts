// Constants
import {
  STACKS_REPOSITORY,
  USER_REPOSITORY
} from 'src/core/constants';

// Entities
import { User } from 'src/core/entities/user.entity';
import { Stack } from '../entities/stack.entity';

export const EntitiesProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User
  },
  {
    provide: STACKS_REPOSITORY,
    useValue: Stack
  },
]
