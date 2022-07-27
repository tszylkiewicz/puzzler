import User from '../model/user';
import logger from '../../../utils/logger';
import { CreateUserRequest, CreateUserResponse } from '../dto/UserDto';

class UserService {
    async createUser(user: CreateUserRequest): Promise<CreateUserResponse> {
        try {
            const newUser = new User({
                userName: user.userName,
                email: user.email,
            });
            const createdUser = await newUser.save();
            return { userId: createdUser._id.toString() };
        } catch (e) {
            if (e.code === 11000) {
                return {
                    error: {
                        type: 'account_already_exists',
                        message: `${user.email} already exists`,
                    },
                };
            } else {
                logger.error(`createUser: ${e}`);
                return {
                    error: {
                        type: 'internal_error',
                        message: e.message,
                    },
                };
            }
        }
    }
}

export default new UserService();
