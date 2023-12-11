const request = require('supertest');
const server = require('../../server');
const resetDb = require('../utils');
const mongoose = require('mongoose');

describe('Events Routes - Update', () => {
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

    it('should update an event by id and return a 200 status code', async () => {
        const update_data = {
            title: 'test_2',
            date: '2023-01-01',
            location: 'Constanta',
            time: '15:00'
        };
        const response = await request(server)
            .put('/api/events/' + createdEvent._id)
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(update_data)

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('title', update_data.title);
        expect(response.body).toHaveProperty('date', update_data.date + 'T00:00:00.000Z');
        expect(response.body).toHaveProperty('location', update_data.location);
        expect(response.body).toHaveProperty('time', update_data.time);
    });

    it('should return a 401 status code for unauthorized user', async () => {
        const update_data = {
            title: 'test',
            date: '2020-01-01',
            location: 'Bucharest',
            time: '12:00'
        };
        const response = await request(server)
            .put('/api/events/' + createdEvent._id)
            .send(update_data)

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message', 'Not authorized');
    });

    it('should return a 401 status code for event not found', async () => {
        const update_data = {
            title: 'test',
            date: '2020-01-01',
            location: 'Bucharest',
            time: '12:00'
        };
        const response = await request(server)
            .put('/api/events/' + '5e9f5b9a9f9e4b1f1c3f8b1a')
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send(update_data)

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Event not found');
    });
});
