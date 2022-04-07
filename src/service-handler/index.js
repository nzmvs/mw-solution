const dbHandler = require('../db-handler')

const getPosts = async () => {
  return await dbHandler.get('co_posts')
}

const getPost = async (postId) => {
  return await dbHandler.get('co_posts', 'post_id', [postId])
}

const getPostsByImpacterId = async (impacterId) => {
  return await dbHandler.get('co_posts', 'impacter_id', [impacterId])
}

const updatePost = async (postId, data) => {
  return await dbHandler.update('co_posts', 'post_id', postId, data)
}

const deletePost = async (postId) => {
  return await dbHandler.remove('co_posts', 'post_id', postId)
}

module.exports = {
  getPosts,
  getPost,
  getPostsByImpacterId,
  updatePost,
  deletePost,
}
