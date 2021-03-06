const db = require('../db/connection.js');
const {
  formatTopicData,
  formatUserData,
  formatArticleData,
  formatCommentData,
} = require('../utils/formatData');
const { checkArticleById } = require('../utils/articleUtils');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');
const { newVote } = require('../utils/articleUtils.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());
//console.log('testdata: ', testData.topicData);

describe('formattedTopics()', () => {
  test('should Return and empty object if passed undefined ', () => {
    expect(formatTopicData()).toEqual([]);
  });
  test('should return a pg-format compatible array of topic objects', () => {
    //console.log(formatTopicData(testData.topicData));
    expect(formatTopicData(testData.topicData)).toEqual([
      ['The man, the Mitch, the legend', 'mitch'],
      ['Not dogs', 'cats'],
      ['what books are made of', 'paper'],
    ]);
  });
});

describe('formattedUsers()', () => {
  test('should Return and empty object if passed undefined ', () => {
    expect(formatUserData()).toEqual([]);
  });
  test('should return a pg-format compatible array of user data objects', () => {
    console.log(formatUserData(testData.userData));
    expect(formatUserData(testData.userData)).toEqual([
      [
        'butter_bridge',
        'jonny',
        'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
      ],
      [
        'icellusedkars',
        'sam',
        'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
      ],
      [
        'rogersop',
        'paul',
        'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
      ],
      [
        'lurker',
        'do_nothing',
        'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      ],
    ]);
  });
});

describe('formattedArticleData()', () => {
  test('should Return and empty object if passed undefined ', () => {
    expect(formatArticleData()).toEqual([]);
  });
  test('should return an array', () => {
    console.log(formatArticleData(testData.articleData));
    expect(formatArticleData(testData.articleData)).toBeInstanceOf(Array);
  });
});

describe('formattedCommentData()', () => {
  test('should return and empty object if passed undefined ', () => {
    expect(formatArticleData()).toEqual([]);
  });
  test('should return an array', () => {
    console.log(formatCommentData(testData.commentData));
    expect(formatCommentData(testData.commentData)).toBeInstanceOf(Array);
  });
});

describe('checkArticleById()', () => {
  test.skip('should return true if the id matches with a current article ', () => {
    expect(checkArticleById(1)).toBe(true);
  });
  test.skip('should return false, if the id does NOT match any current articles', () => {
    expect(checkArticleById(99999)).toEqual(false);
  });
});
