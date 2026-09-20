import { LoginUser } from '../api/UserApi';
import { User } from '../test-data/users';

export function createTestUser(): LoginUser {
    const timestamp = Date.now();
        return {
            userName: User.TestUser.UserName + timestamp,
            password: User.TestUser.Password,
        };
    }