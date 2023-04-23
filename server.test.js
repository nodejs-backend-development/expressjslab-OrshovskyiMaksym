const request = require('supertest');
const app = require('./app');

describe('Test the user posts endpoints', () => {
    const testUserId = 1;
    const testPost = { title: 'Test Post', body: 'Test Body' };

    test('GET /users/:userId/posts should return status 200', async () => {
        const response = await request(app).get(/users/${testUserId}/posts);
        expect(response.statusCode).toBe(200);
    });

    test('GET /users/:userId/posts should return an array of posts', async () => {
        const response = await request(app).get(/users/${testUserId}/posts);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('POST /users/:userId/posts should return status 201', async () => {
        const response = await request(app).post(/users/${testUserId}/posts).send(testPost);
        expect(response.statusCode).toBe(201);
    });

    test('POST /users/:userId/posts should return the created post', async () => {
        const response = await request(app).post(/users/${testUserId}/posts).send(testPost);
        expect(response.body.title).toEqual(testPost.title);
        expect(response.body.body).toEqual(testPost.body);
    });
});