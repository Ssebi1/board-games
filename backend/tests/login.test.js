const request = require('supertest');
const server = require('../server');
const resetDb = require('./utils');
const mongoose = require('mongoose');

describe('Auth Routes - Login', () => {
    let registeredUser;

    beforeAll(async () =>  {
        await resetDb();
        // Register a new user for testing login
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        const response = await request(server)
            .post('/api/auth/register')
            .send(userData);

        registeredUser = response.body;
    });

    afterAll(async () => {
        await server.close();
        await mongoose.connection.close();
    });

    it('should login an existing user and return a 201 status code', async () => {
        const loginData = {
            email: registeredUser.email,
            password: 'password123',
        };

        const response = await request(server)
            .post('/api/auth/login')
            .send(loginData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id', registeredUser._id);
        expect(response.body).toHaveProperty('name', registeredUser.name);
        expect(response.body).toHaveProperty('email', registeredUser.email);
        expect(response.body).toHaveProperty('token');
    });

    it('should return a 400 status code for missing fields', async () => {
        const response = await request(server)
            .post('/api/auth/login')
            .send({
                // Omitting required fields intentionally
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Missing fields');
    });

    it('should return a 400 status code for incorrect password', async () => {
        const loginData = {
            email: registeredUser.email,
            password: 'incorrect-password',
        };

        const response = await request(server)
            .post('/api/auth/login')
            .send(loginData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Cannot login user');
    });

    it('should return a 400 status code for non-existent user', async () => {
        const nonExistentUser = {
            email: 'nonexistent@example.com',
            password: 'password123',
        };

        const response = await request(server)
            .post('/api/auth/login')
            .send(nonExistentUser);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Cannot login user');
    });
});
