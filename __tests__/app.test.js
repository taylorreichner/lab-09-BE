const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Player = require('../lib/models/Player')

describe('lab-09-BE routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let player;

  beforeEach( async () => {
    player = await Player.insert({
        name: 'tom brady',
        position: 'quaterback',
        rank: 3,
    })
  })

  it('adds player to database', () => {
    return request(app)
      .post('/api/v1/players')
      .send({
        name: 'tom brady',
        position: 'quaterback',
        rank: 3,
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          name: 'tom brady',
          position: 'quaterback',
          rank: 3,
        })
      })
  })

  it('finds player by id', () => {
    return request(app)
      .get('/api/v1/players/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          name: 'tom brady',
          position: 'quaterback',
          rank: 3,
        })
      })
  })

  it('finds player by id and updates their rank', () => {
    return request(app)
      .put('/api/v1/players/1')
      .send({ rank: 12 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          name: 'tom brady',
          position: 'quaterback',
          rank: 12,
        })
      })
  })

  it('finds player by id and deletes them', () => {
    return request(app)
      .delete('/api/v1/players/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          name: 'tom brady',
          position: 'quaterback',
          rank: 3,
        })
      })
  })

  it('returns all players', () => {
    return request(app)
      .get('/api/v1/players')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          name: 'tom brady',
          position: 'quaterback',
          rank: 3,
        })
      })
  })



});


