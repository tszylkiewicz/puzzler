import db from '../../../../utils/db'
import { faker } from '@faker-js/faker'
import Producer from '../producer'

beforeAll(async () => {
    await db.open()
})

afterAll(async () => {
    await db.close()
})

describe('save', () => {
    it('should create producer', async () => {
        // given
        const name = faker.company.companyName()
        const url = faker.internet.url()

        // when
        const producer = new Producer({ name: name, logoUrl: url })
        await producer.save()

        // then
        const fetched = await Producer.findById(producer._id)
        expect(fetched).not.toBeNull()
        expect(fetched.name).toEqual(name)
        expect(fetched.logoUrl).toEqual(url)
        expect(fetched.createdAt).toBeInstanceOf(Date)
        expect(fetched.updatedAt).toBeInstanceOf(Date)
    })
})
