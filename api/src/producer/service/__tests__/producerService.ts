import { faker } from '@faker-js/faker'
import db from '../../../../utils/db'
import ProducerService from '../producerService'
import Producer from '../../model/producer'

beforeAll(async () => {
    await db.open()
})

afterAll(async () => {
    await db.close()
})

describe('getProducerById', () => {
    it('given existing id should return corresponding producer', async () => {
        // given
        const name = faker.company.companyName()
        const logoUrl = faker.internet.url()
        const producer = new Producer({ name: name, logoUrl: logoUrl })
        await producer.save()

        // when
        const fetchedProducer = await ProducerService.getProducerById(
            producer._id.toString()
        )

        // then
        expect(fetchedProducer).toEqual({
            id: producer._id.toString(),
            name: name,
            logoUrl: logoUrl,
        })
    })
})

describe('createProducer', () => {
    it('given valid request should create new producer', async () => {
        // given
        const name = faker.company.companyName()
        const logoUrl = faker.internet.url()
        const request = { name: name, logoUrl: logoUrl }

        // when
        const createdProducer = await ProducerService.createProducer(request)

        // then
        expect(createdProducer).toEqual({
            id: expect.stringMatching(/^[a-f0-9]{24}$/),
            name: name,
            logoUrl: logoUrl,
        })
    })
})

describe('updateProducer', () => {
    it('given valid request should update existing producer', async () => {
        // given
        const name = faker.company.companyName()
        const logoUrl = faker.internet.url()
        const producer = new Producer({ name: name, logoUrl: logoUrl })
        await producer.save()

        const newName = faker.company.companyName()
        const newUrl = faker.internet.url()
        const request = { name: newName, logoUrl: newUrl }

        // when
        const updatedProducer = await ProducerService.updateProducer(
            producer._id.toString(),
            request
        )

        // then
        expect(updatedProducer).toEqual({
            id: producer._id.toString(),
            name: newName,
            logoUrl: newUrl,
        })
    })
})

describe('deleteProducer', () => {
    it('given existing id should delete corresponding producer', async () => {
        // given
        const name = faker.company.companyName()
        const logoUrl = faker.internet.url()
        const producer = new Producer({ name: name, logoUrl: logoUrl })
        await producer.save()

        // when
        await ProducerService.deleteProducer(producer._id.toString())

        // then
        const response = await Producer.findOne({ _id: producer._id })
        expect(response).toBeNull()
    })
})
