const express = require('express')
const serviceHandler = require('../service-handler')

module.exports = () => {
  const router = express.Router()

  router.get('/', async(req, res, next) => {
    try {
      const posts = await serviceHandler.getPosts()
      res.json(posts)
    } catch (error) {
      next(error)
    }
  })

  router.get('/:postId', async(req, res, next) => {
    try {
      const { postId } = req.params
      const post = await serviceHandler.getPost(postId)
      res.json(post)
    } catch (error) {
      next(error)
    }
  })

  router.get('/impacter/:impacterId', async(req, res, next) => {
    try {
      const { impacterId } = req.params
      const post = await serviceHandler.getPostsByImpacterId(impacterId)
      res.json(post)
    } catch (error) {
      next(error)
    }
  })

  router.put('/:postId', async(req, res, next) => {
    try {
      const { body, params: { postId } } = req;
      await serviceHandler.updatePost(postId, body)
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:postId', async(req, res, next) => {
    try {
      const { postId } = req.params
      await serviceHandler.deletePost(postId)
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  })

  return router;
}
