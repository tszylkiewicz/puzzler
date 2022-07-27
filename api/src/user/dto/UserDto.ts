import { ErrorResponse } from '../../common/ErrorResponse';

export type CreateUserRequest = {
    userName: string;
    email: string;
};

export type CreateUserResponse = { userId: string } | ErrorResponse;
