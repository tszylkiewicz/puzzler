import { faker } from '@faker-js/faker'
import db from '../../../../utils/db'
import userService from '../userService'

beforeAll(async () => {
    await db.open()
})

afterAll(async () => {
    await db.close()
})

describe('createUser', () => {
    it('should resolve with true and valid userId', async () => {
        const email = faker.internet.email()
        const name = faker.name.firstName()
        const request = { userName: name, email: email }

        await expect(userService.createUser(request)).resolves.toEqual({
            userId: expect.stringMatching(/^[a-f0-9]{24}$/),
        })
    })

    it('should resolves with false & valid error if duplicate', async () => {
        const email = faker.internet.email()
        const name = faker.name.firstName()
        const request = { userName: name, email: email }

        await userService.createUser(request)

        await expect(userService.createUser(request)).resolves.toEqual({
            error: {
                type: 'account_already_exists',
                message: `${email} already exists`,
            },
        })
    })

    it('should reject if invalid input', async () => {
        const email = 'invalid'
        const name = faker.name.firstName()
        const request = { userName: name, email: email }

        await expect(userService.createUser(request)).rejects.toThrowError(
            /validation failed/
        )
    })
})
