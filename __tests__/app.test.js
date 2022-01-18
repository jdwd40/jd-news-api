const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('200: responds with an array of topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        //console.log(Object.keys(res.body));
        expect(res.body.topics).toEqual([
          {
            description: 'The man, the Mitch, the legend',
            slug: 'mitch',
          },
          {
            description: 'Not dogs',
            slug: 'cats',
          },
          {
            description: 'what books are made of',
            slug: 'paper',
          },
        ]);
      });
  });
});

describe('GET /api/articles:id', () => {
  test('200: responds with an article object 1 when given article id 1', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((res) => {
        expect(res.body[0]).toEqual({
          article_id: 1,
          author: 'butter_bridge',
          body: 'I find this existence challenging',
          created_at: '2020-07-08T23:00:00.000Z',
          title: 'Living in the shadow of a great man',
          topic: 'mitch',
          votes: 100,
        });
      });
  });
});

describe('GET /api/articles', () => {
  test('200: responds with an array of articles', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        console.log(res.body.length);
        expect(res.body).toHaveLength(12);
      });
  });
});

describe('PATCH /api/articles', () => {
  test('200: updates a record in the database', () => {
    return request(app)
      .patch('/api/articles/1')
      .expect(200)
      .then((res) => {
        console.log(res.body.length);
        expect(res.body).toHaveLength(12);
      });
  });
});

describe('5. PATCH /api/artilces/:articles_id', () => {
  test('status:200, responds with the updated article', () => {
    const articleUpdates = { inc_vote: 1 };
    return request(app)
      .patch('/api/articles/1')
      .send(articleUpdates)
      .expect(200)
      .then(({ body }) => {
        expect(body[0].votes).toBe(101);
      });
  });
});
