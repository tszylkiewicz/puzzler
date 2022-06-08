import User from '../model/user'
import logger from '../../../utils/logger'

export type ErrorResponse = { error: { type: string; message: string } }

export type CreateUserRequest = {
    userName: string
    email: string
}

export type CreateUserResponse = { userId: string } | ErrorResponse

function createUser(user: CreateUserRequest): Promise<CreateUserResponse> {
    return new Promise(function (resolve, reject) {
        const newUser = new User({ userName: user.userName, email: user.email })
        newUser
            .save()
            .then((u) => {
                resolve({ userId: u._id.toString() })
            })
            .catch((err) => {
                if (err.code === 11000) {
                    resolve({
                        error: {
                            type: 'account_already_exists',
                            message: `${user.email} already exists`,
                        },
                    })
                } else {
                    logger.error(`createUser: ${err}`)
                    reject(err)
                }
            })
    })
}

export default { createUser: createUser }
