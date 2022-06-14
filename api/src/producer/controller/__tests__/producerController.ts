import { faker } from '@faker-js/faker'

import request from 'supertest'
import { Express } from 'express-serve-static-core'

import db from '../../../../utils/db'
import { createServer } from '../../../../utils/server'
import Producer from '../../model/producer'

let server: Express

const baseUrl = '/api/producers/v1'

beforeAll(async () => {
    await db.open()
    server = await createServer()
})

afterAll(async () => {
    await db.close()
})

describe('GET /api/producers/v1', () => {
    it('should return 200 & empty response when no producers found', async () => {
        // given when
        const response = await request(server).get(baseUrl).expect(200)

        // then
        expect(response.body).toHaveLength(0)
    })

    it('should return 200 & valid response with all producers', async () => {
        // given
        const name = faker.company.companyName()
        const url = faker.internet.url()
        const producer = new Producer({ name: name, logoUrl: url })
        const producer2 = new Producer({ name: name, logoUrl: url })
        await producer.save()
        await producer2.save()

        // when
        const response = await request(server).get(baseUrl).expect(200)

        // then
        expect(response.body).toHaveLength(2)
        expect(response.body).toContainEqual({
            id: producer._id.toString(),
            name: producer.name,
            logoUrl: producer.logoUrl,
        })
        expect(response.body).toContainEqual({
            id: producer2._id.toString(),
            name: producer2.name,
            logoUrl: producer2.logoUrl,
        })
    })
})

describe('POST /api/producers/v1', () => {
    it('should return 201 & valid response for valid producer', async () => {
        // given
        const name = faker.company.companyName()
        const logoUrl = faker.internet.url()

        // when
        const response = await request(server)
            .post(baseUrl)
            .send({
                name: name,
                logoUrl: logoUrl,
            })
            .expect(201)

        // then
        expect(response.body).toEqual({
            id: expect.stringMatching(/^[a-f0-9]{24}$/),
            name: name,
            logoUrl: logoUrl,
        })
    })
})

describe('GET /api/producers/v1/:id', () => {
    it('should return 200 & valid response for valid producer ID', async () => {
        // given
        const name = faker.company.companyName()
        const url = faker.internet.url()
        const producer = new Producer({ name: name, logoUrl: url })
        await producer.save()

        // when
        const response = await request(server)
            .get(`${baseUrl}/${producer._id}`)
            .expect(200)

        // then
        expect(response.body).toEqual({
            id: producer._id.toString(),
            name: name,
            logoUrl: url,
        })
    })

    it('should return 404 when producer not found', async () => {
        // given when then
        const producerId = faker.database.mongodbObjectId()
        request(server).get(`${baseUrl}/${producerId}`).expect(404)
    })
})

describe('PUT /api/producers/v1/:id', () => {
    it('should return 200 & valid response for valid producer ID and request', async () => {
        // given
        const name = faker.company.companyName()
        const url = faker.internet.url()
        const producer = new Producer({ name: name, logoUrl: url })
        await producer.save()

        const newName = faker.company.companyName()
        const newUrl = faker.internet.url()

        // when
        const response = await request(server)
            .put(`${baseUrl}/${producer._id}`)
            .send({
                name: newName,
                logoUrl: newUrl,
            })
            .expect(200)

        // then
        expect(response.body).toEqual({
            id: producer._id.toString(),
            name: newName,
            logoUrl: newUrl,
        })
    })

    it('should return 404 when producer not found', async () => {
        // given when then
        const producerId = faker.database.mongodbObjectId()
        request(server).put(`${baseUrl}/${producerId}`).expect(404)
    })
})

describe('DELETE /api/producers/v1/:id', () => {
    it('should return 204 for valid producer ID', async () => {
        // given
        const name = faker.company.companyName()
        const url = faker.internet.url()
        const producer = new Producer({ name: name, logoUrl: url })
        await producer.save()

        // when then
        await request(server).delete(`${baseUrl}/${producer._id}`).expect(204)
    })
})
