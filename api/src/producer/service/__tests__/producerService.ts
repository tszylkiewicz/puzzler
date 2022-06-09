import { faker } from '@faker-js/faker'
import db from '../../../../utils/db'
import ProducerService from '../producerService'

beforeAll(async () => {
    await db.open()
})

afterAll(async () => {
    await db.close()
})

describe('createProducer', () => {
    it('should resolve with true and valid producer ID', async () => {
        const name = faker.company.companyName()
        const logoUrl = faker.internet.url()
        const request = { name: name, logoUrl: logoUrl }

        await expect(ProducerService.createProducer(request)).resolves.toEqual({
            producerId: expect.stringMatching(/^[a-f0-9]{24}$/),
        })
    })
})
