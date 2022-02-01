const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');
const { countCommentsById } = require('../models/comments.model');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('200: responds with an array', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeInstanceOf(Array);
      });
  });
  test('200: responds with corrent array length', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toHaveLength(3);
      });
  });
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
  test('status:400, responds with an error message when passed an out of range article ID integer', () => {
    return request(app)
      .get('/api/articles/1000')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Article Not Found');
      });
  });
  test('status:400, responds with an error message when passed a bad article ID (string instead of int)', () => {
    return request(app)
      .get('/api/articles/abadid')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid input');
      });
  });
});

describe('GET /api/articles', () => {
  test('200: responds with an array', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
  test('200: responds with the correct length of array of articles', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        console.log(res.body.length);
        expect(res.body).toHaveLength(12);
      });
  });
  test('responds with an array of articles sorted in decending odrer', () => {
    return request(app)
      .get('/api/articles?order_by=DESC')
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual([
          {
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            topic: 'mitch',
            body: 'some gifs',
            votes: 0,
            author: 'icellusedkars',
            created_at: '2020-11-03T00:00:00.000Z',
          },
          {
            article_id: 6,
            title: 'A',
            topic: 'mitch',
            body: 'Delicious tin of cat food',
            votes: 0,
            author: 'icellusedkars',
            created_at: '2020-10-17T23:00:00.000Z',
          },
          {
            article_id: 2,
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
            votes: 0,
            author: 'icellusedkars',
            created_at: '2020-10-15T23:00:00.000Z',
          },
          {
            article_id: 12,
            title: 'Moustache',
            topic: 'mitch',
            body: 'Have you seen the size of that thing?',
            votes: 0,
            author: 'butter_bridge',
            created_at: '2020-10-10T23:00:00.000Z',
          },
          {
            article_id: 5,
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            votes: 0,
            author: 'rogersop',
            created_at: '2020-08-02T23:00:00.000Z',
          },
          {
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            body: 'I find this existence challenging',
            votes: 100,
            author: 'butter_bridge',
            created_at: '2020-07-08T23:00:00.000Z',
          },
          {
            article_id: 9,
            title: "They're not exactly dogs, are they?",
            topic: 'mitch',
            body: 'Well? Think about it.',
            votes: 0,
            author: 'butter_bridge',
            created_at: '2020-06-05T23:00:00.000Z',
          },
          {
            article_id: 10,
            title: 'Seven inspirational thought leaders from Manchester UK',
            topic: 'mitch',
            body: "Who are we kidding, there is only one, and it's Mitch!",
            votes: 0,
            author: 'rogersop',
            created_at: '2020-05-13T23:00:00.000Z',
          },
          {
            article_id: 4,
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            body: 'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            votes: 0,
            author: 'rogersop',
            created_at: '2020-05-05T23:00:00.000Z',
          },
          {
            article_id: 8,
            title: 'Does Mitch predate civilisation?',
            topic: 'mitch',
            body: 'Archaeologists have uncovered a gigantic statue from the dawn of humanity, and it has an uncanny resemblance to Mitch. Surely I am not the only person who can see this?!',
            votes: 0,
            author: 'icellusedkars',
            created_at: '2020-04-16T23:00:00.000Z',
          },
          {
            article_id: 11,
            title: 'Am I a cat?',
            topic: 'mitch',
            body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
            votes: 0,
            author: 'icellusedkars',
            created_at: '2020-01-15T00:00:00.000Z',
          },
          {
            article_id: 7,
            title: 'Z',
            topic: 'mitch',
            body: 'I was hungry.',
            votes: 0,
            author: 'icellusedkars',
            created_at: '2020-01-07T00:00:00.000Z',
          },
        ]);
      });
  });
  test('responds with status 400 if order_by is passed an invalid sort query', () => {
    return request(app)
      .get('/api/articles?order_by=invalidsortquery')
      .expect(400)
      .then((res) => {
        console.log(res.body);
        expect(res.body.msg).toBe('Invalid order query');
      });
  });
});

describe('PATCH /api/artilces/:articles_id', () => {
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
  test('status:400, responds with bad request if given invalid article ID', () => {
    const articleUpdates = { inc_vote: 1 };
    return request(app)
      .patch('/api/articles/99999')
      .send(articleUpdates)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Article Not Found');
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
        //console.log(res.body, 'RES OUTPUT');
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
  test('status 400: catches an empty string error when trying to post an empty comment', () => {
    return request(app)
      .post('/api/articles/9/comments')
      .send({
        username: 'butter_bridge',
        body: '',
      })
      .expect(400)
      .then((res) => {
        console.log(res.body, 'RES OUTPUT');
        expect(res.body.msg).toEqual('Bad Request - Tried to send Null Value');
      });
  });
  test('status 400: catches an undefined error when trying to post an empty comment', () => {
    return request(app)
      .post('/api/articles/9/comments')
      .send({
        username: 'butter_bridge',
        body: undefined,
      })
      .expect(400)
      .then((res) => {
        console.log(res.body, 'RES OUTPUT');
        expect(res.body.msg).toEqual('Bad Request - Tried to send Null Value');
      });
  });
  test('countCommentsById: returns an integer of the number of comments referenced by the passed article id', () => {
    expect(countCommentsById(1)).toBe(11);
  });
});
describe('DELETE /api/comments/:comment_id', () => {
  test('status 204 deletes the comment referenced at comment_id', () => {
    return request(app)
      .delete('/api/comments/18')
      .expect(204)
      .then(() => {
        return db.query('SELECT * FROM comments WHERE comment_id=18;');
      })
      .then(({ rowCount }) => {
        expect(rowCount).toBe(0);
      });
  });
});
describe('404 Error handling testing', () => {
  test('status 404 - catches 404 errors and displays custom message', () => {
    return request(app)
      .get('/api/notanendpoint')
      .expect(404)
      .then((res) => {
        console.log(Object.keys(res));
        console.log(res.body);
        expect(res.body.msg).toBe('Invalid Endpoint');
      });
  });
});

// describe('Utilities functions', () => {
//   test('returns a JSON object showing all the endpoints');
// });
