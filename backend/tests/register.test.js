// example.test.js
const request = require('supertest');
const server = require('../server')
const User = require('../models/userModel')
const resetDb = require("./utils");
const mongoose = require('mongoose');

describe('Auth Routes - Register', () => {
    beforeAll(async () => await resetDb());

    afterAll(async () => {
        await server.close();
        await mongoose.connection.close();
    })

    it('should register a new user and return a 201 status code', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        const response = await request(server)
            .post('/api/auth/register')
            .send(userData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name', userData.name);
        expect(response.body).toHaveProperty('email', userData.email);
        expect(response.body).toHaveProperty('token');
    });

    it('should return a 400 status code for missing fields', async () => {
        const response = await request(server)
            .post('/api/auth/register')
            .send({
                // Omitting required fields intentionally
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Missing fields');
    });

    it('should return a 400 status code for an already registered email', async () => {
        // Create a user with the same email before making the request
        const existingUser = {
            name: 'Existing User',
            email: 'existing@example.com',
            password: 'password123',
        };

        await User.create(existingUser);

        // Attempt to register a new user with the same email
        const response = await request(server)
            .post('/api/auth/register')
            .send(existingUser);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'This email is already used');
    });
});

