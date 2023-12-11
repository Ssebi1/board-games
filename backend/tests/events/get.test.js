const request = require('supertest');
const server = require('../../server');
const resetDb = require('../utils');
const mongoose = require('mongoose');

describe('Events Routes - Get', () => {
    let loggedInUser, createdEvent;

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

        let response = await request(server)
            .post('/api/auth/login')
            .send(loginData);
        loggedInUser = response.body;

        const createData = {
            title: 'test',
            date: '2020-01-01',
            location: 'Bucharest',
            time: '12:00'
        };
        response = await request(server)
            .post('/api/events')
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(createData);
        createdEvent = response.body;
    });

    afterAll(async () => {
        await server.close();
        await mongoose.connection.close();
    });

    it('should delete an event by id and return a 200 status code', async () => {
        const response = await request(server)
            .get('/api/events/' + createdEvent._id)
            .set('Authorization', `Bearer ${loggedInUser.token}`)

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('title', createdEvent.title);
        expect(response.body).toHaveProperty('date', createdEvent.date);
        expect(response.body).toHaveProperty('location', createdEvent.location);
        expect(response.body).toHaveProperty('time', createdEvent.time);
    });

    it('should get all events and return a 200 status code', async () => {
        const response = await request(server)
            .get('/api/events')
            .set('Authorization', `Bearer ${loggedInUser.token}`)

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('title', createdEvent.title);
        expect(response.body[0]).toHaveProperty('date', createdEvent.date);
        expect(response.body[0]).toHaveProperty('location', createdEvent.location);
        expect(response.body[0]).toHaveProperty('time', createdEvent.time);
    });
});
