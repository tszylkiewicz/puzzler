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

    it('should not save producer without a name', async () => {
        // given
        const logoUrl = faker.internet.url()

        // when then
        const producer = new Producer({ logoUrl: logoUrl })
        await expect(producer.save()).rejects.toThrowError(/Name is required/)
    })

    it('should save producer without a logo url', async () => {
        // given
        const name = faker.company.companyName()

        // when
        const producer = new Producer({ name: name })
        await producer.save()

        // then
        const fetched = await Producer.findById(producer._id)
        expect(fetched).not.toBeNull()
        expect(fetched.name).toEqual(name)
        expect(fetched.logoUrl).toBeUndefined()
    })
})
