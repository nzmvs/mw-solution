const { expect } = require('chai')
const supertest = require('supertest')
const db = require('../../src/db')
const fixtures = require('../fixtures')
const server = require('../../src/server')

const prepareTestData = (data) => JSON.parse(JSON.stringify(data))

describe('/api/v1', () => {
  describe('/posts', () => {
    let impacterId, postIds

    beforeEach(async () => {
      let result = await db.instance()
        .table('co_impacters')
        .returning(['impacter_id'])
        .insert(fixtures.coImpacters)

      impacterId = result[0].impacter_id

      const copy = prepareTestData(fixtures.coPosts)
      copy.forEach(c => c.impacter_id = impacterId)

      result = await db.instance()
        .table('co_posts')
        .returning(['post_id'])
        .insert(copy)
      
      postIds = result.map(p => p.post_id)
    })
    
    afterEach(async () => {
      await db.instance().table("co_posts").del()
      await db.instance().table("co_impacters").del()
    })

    describe('GET /posts/', () => {
      it('Returns all posts', async () => {
        await supertest(server.instance())
          .get('/api/v1/posts')
          .expect(200)
          .then(response => {
            const savedIds = response.body.map(p => p.post_id)
            expect(savedIds).deep.equal(postIds)
          })
      })

      it('Returns empty list if no posts available', async () => {
        await db.instance().table("co_posts").del()
        await db.instance().table("co_impacters").del()

        await supertest(server.instance())
          .get('/api/v1/posts')
          .expect(200)
          .then(response => {
            expect(response.body).deep.equal([])
          })
      })
    })

    describe('GET /posts/:postId', () => {
      it('Returns correct post', async () => {
        const postId = postIds[0]

        await supertest(server.instance())
          .get(`/api/v1/posts/${postId}`)
          .expect(200)
          .then(response => {
            const result = {...response.body[0]}
            delete result.created_at
            delete result.updated_at

            expect(result).deep.equal({
              ...prepareTestData(fixtures.coPosts[0]),
              post_id: postId,
              impacter_id: impacterId,
            })
          })
      })

      it('Returns empty list if not found', async () => {
        await db.instance().table("co_posts").del()
        await db.instance().table("co_impacters").del()

        const postId = postIds[0]

        await supertest(server.instance())
          .get(`/api/v1/posts/${postId}`)
          .expect(200)
          .then(response => {
            expect(response.body).deep.equal([])
          })
      })
    })

    describe('GET /posts/impacter/:impacterId', () => {
      it('Returns all posts for an impacter', async () => {
        await supertest(server.instance())
          .get(`/api/v1/posts/impacter/${impacterId}`)
          .expect(200)
          .then(response => {
            const savedIds = response.body.map(p => p.post_id)
            expect(savedIds.sort()).deep.equal(postIds.sort())
          })
      })

      it('Returns empty list if not found', async () => {
        await db.instance().table("co_posts").del()
        await db.instance().table("co_impacters").del()

        await supertest(server.instance())
          .get(`/api/v1/posts/impacter/${impacterId}`)
          .expect(200)
          .then(response => {
            expect(response.body).deep.equal([])
          })
      })
    })

    describe('PUT /posts/:postId', () => {
      it('Returns 200 when update successful', async () => {
        const postId = postIds[0]

        await supertest(server.instance())
          .put(`/api/v1/posts/${postId}`)
          .send({ status: "HIDDEN" })
          .expect(200)

        const [post] = await db.instance()
          .table('co_posts')
          .where('post_id', postId)

        expect(post.status).equal("HIDDEN")
      })
    })

    describe('DELETE /posts/:postId', () => {
      it('Returns 200 when delete successful', async () => {
        const postId = postIds[0]

        await supertest(server.instance())
          .delete(`/api/v1/posts/${postId}`)
          .expect(200)

        const post = await db.instance()
          .table('co_posts')
          .where('post_id', postId)

        expect(post).deep.equal([])
      })
    })
  })
})