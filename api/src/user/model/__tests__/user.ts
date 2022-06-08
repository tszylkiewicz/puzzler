import { faker } from '@faker-js/faker'
import User from '../user'
import db from '../../../../utils/db'

beforeAll(async () => {
    await db.open()
})

afterAll(async () => {
    await db.close()
})

describe('save', () => {
    it('should create user', async () => {
        const email = faker.internet.email()
        const userName = faker.name.firstName()

        const user = new User({ userName: userName, email: email })
        await user.save()

        const fetched = await User.findById(user._id)

        expect(fetched).not.toBeNull()

        expect(fetched.email).toBe(email)
        expect(fetched.userName).toBe(userName)
        expect(fetched.createdAt).not.toBeNull()
        expect(fetched.updatedAt).not.toBeNull()
    })

    it('should not save user without a user name', async () => {
        const user1 = new User({ email: faker.internet.email() })
        await expect(user1.save()).rejects.toThrowError(/User name is required/)
    })

    it('should not save user without an email', async () => {
        const user = new User({ userName: faker.name.firstName() })
        await expect(user.save()).rejects.toThrowError(/Email is required/)
    })

    it('should not save user with invalid email', async () => {
        const user1 = new User({
            email: 'email@em.o',
            userName: faker.name.firstName(),
        })
        await expect(user1.save()).rejects.toThrowError(/Invalid email format/)
    })

    it('should not save user with the same email', async () => {
        const email = faker.internet.email()
        const name = faker.name.firstName()
        const userData = { userName: name, email: email }

        const user1 = new User(userData)
        await user1.save()

        const user2 = new User(userData)
        await expect(user2.save()).rejects.toThrowError(/E11000/)
    })
})
