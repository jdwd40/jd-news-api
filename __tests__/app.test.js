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
  test('status:400, responds with an error message when passed a bad article ID', () => {
    return request(app)
      .get('/api/articles/1000')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Article Not Found');
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

describe('5. PATCH /api/artilces/:articles_id', () => {
  test('status:200, responds with the updated article', () => {
    const articleUpdates = { inc_vote: 1 };
    return request(app)
      .patch('/api/articles/1')
      .send(articleUpdates)
      .expect(200)
      .then(({ body }) => {
        console.log(body.updatedArticle[0]);
        expect(body.updatedArticle[0].votes).toBe(101);
      });
  });
});

describe('GET /api/articles/:articles_id/comments', () => {
  test('status:200, responds with an array of comments for the given article_id of which each comment', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then((res) => {
        console.log('from test: returned body: ', res.body);
        expect(res.body.comments).toEqual([
          2,
          14,
          '2020-10-31T00:00:00.000Z',
          'butter_bridge',
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
          3,
          100,
          '2020-03-01T00:00:00.000Z',
          'icellusedkars',
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
          4,
          -100,
          '2020-02-23T00:00:00.000Z',
          'icellusedkars',
          ' I carry a log — yes. Is it funny to you? It is not to me.',
          5,
          0,
          '2020-11-03T00:00:00.000Z',
          'icellusedkars',
          'I hate streaming noses',
          6,
          0,
          '2020-04-10T23:00:00.000Z',
          'icellusedkars',
          'I hate streaming eyes even more',
          7,
          0,
          '2020-05-14T23:00:00.000Z',
          'icellusedkars',
          'Lobster pot',
          8,
          0,
          '2020-04-13T23:00:00.000Z',
          'icellusedkars',
          'Delicious crackerbreads',
          9,
          0,
          '2020-01-01T00:00:00.000Z',
          'icellusedkars',
          'Superficially charming',
          12,
          0,
          '2020-03-02T00:00:00.000Z',
          'icellusedkars',
          'Massive intercranial brain haemorrhage',
          13,
          0,
          '2020-06-14T23:00:00.000Z',
          'icellusedkars',
          'Fruit pastilles',
          18,
          16,
          '2020-07-20T23:00:00.000Z',
          'butter_bridge',
          'This morning, I showered for nine minutes.',
        ]);
      });
  });
});

describe('POST /api/articles/:article_id/comments', () => {
  test('status 201: accepts object and returns new comment', () => {
    return request(app)
      .post('/api/articles/9/comments')
      .send({
        username: 'butter_bridge',
        body: 'Test Post!',
      })
      .expect(201)
      .then((res) => {
        console.log(res.body, 'RES OUTPUT');
        expect(res.body.comment).toEqual('Test Post!');
      });
  });
  test('status 400: catches the null value error when trying to post an empty comment', () => {
    return request(app)
      .post('/api/articles/9/comments')
      .send({
        username: 'butter_bridge',
        body: null,
      })
      .expect(400)
      .then((res) => {
        console.log(res.body, 'RES OUTPUT');
        expect(res.body.msg).toEqual('Bad Request - Tried to send Null Value');
      });
  });
});

describe('DELETE /api/comments/:comment_id', () => {
  test('status 204 accepts object and returns new comment', () => {
    return request(app).delete('/api/comments/18').expect(204);
  });
});

describe('Error handling testing', () => {
  test('status 404 - catches 404 errors and displays cutom message', () => {
    return request(app)
      .get('/api/notanendpoint')
      .expect(404)
      .then((res) => {
        console.log(Object.keys(res));
        expect(res.msg).toBe('Invalid Endpoint');
      });
  });
});
