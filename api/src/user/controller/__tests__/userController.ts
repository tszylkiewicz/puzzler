import { faker } from '@faker-js/faker'

import request from 'supertest'
import { Express } from 'express-serve-static-core'

import db from '../../../../utils/db'
import { createServer } from '../../../../utils/server'

let server: Express

beforeAll(async () => {
    await db.open()
    server = await createServer()
})

afterAll(async () => {
    await db.close()
})

describe('POST /api/users/v1', () => {
    it('should return 201 & valid response for valid user', async () => {
        const response = await request(server)
            .post(`/api/users/v1`)
            .send({
                email: faker.internet.email(),
                userName: faker.name.firstName(),
            })
            .expect(201)

        expect(response.body).toMatchObject({
            userId: expect.stringMatching(/^[a-f0-9]{24}$/),
        })
    })

    it('should return 409 & valid response for duplicated user', async () => {
        const data = {
            email: faker.internet.email(),
            userName: faker.name.firstName(),
        }
        await request(server).post(`/api/users/v1`).send(data).expect(201)

        const response = await request(server)
            .post(`/api/users/v1`)
            .send(data)
            .expect(409)

        expect(response.body).toMatchObject({
            error: {
                type: 'account_already_exists',
                message: expect.stringMatching(/already exists/),
            },
        })
    })

    it('should return 400 & valid response for invalid request', async () => {
        const response = await request(server)
            .post(`/api/users/v1`)
            .send({
                email: faker.name.firstName(),
                userName: faker.name.firstName(),
            })
            .expect(400)

        expect(response.body).toMatchObject({
            name: 'ValidationError',
            message: expect.stringMatching(/email/),
        })
    })
})
