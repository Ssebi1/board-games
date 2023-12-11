const request = require('supertest');
const server = require('../../server');
const resetDb = require('../utils');
const mongoose = require('mongoose');

describe('Events Routes - Create', () => {
    let loggedInUser;

    beforeAll(async () =>  {
        await resetDb();
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        await request(server)
            .post('/api/auth/register')
            .send(userData);

        const loginData = {
            email: 'john@example.com',
            password: 'password123',
        };

        const response = await request(server)
            .post('/api/auth/login')
            .send(loginData);
        loggedInUser = response.body;
    });

    afterAll(async () => {
        await server.close();
        await mongoose.connection.close();
    });

    it('should create an event and return a 200 status code', async () => {
        const createData = {
            title: 'test',
            date: '2020-01-01',
            location: 'Bucharest',
            time: '12:00'
        };

        const response = await request(server)
            .post('/api/events')
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(createData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('title', createData.title);
        expect(response.body).toHaveProperty('date', createData.date + 'T00:00:00.000Z');
        expect(response.body).toHaveProperty('location', createData.location);
        expect(response.body).toHaveProperty('time', createData.time);
    });

    it('should return a 400 status code for missing fields', async () => {
        const createData = {
            title: 'test',
            time: '12:00'
        };

        const response = await request(server)
            .post('/api/events')
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(createData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Missing fields');
    });

    it('should return a 401 status code for unauthorized user', async () => {
        const createData = {
            title: 'test',
            date: '2020-01-01',
            location: 'Bucharest',
            time: '12:00'
        };

        const response = await request(server)
            .post('/api/events')
            .send(createData);

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message', 'Not authorized');
    });
});
