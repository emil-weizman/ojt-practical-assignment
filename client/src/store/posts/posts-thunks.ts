import { createAsyncThunk } from '@reduxjs/toolkit'
import { AddCommentParams, ChangeCommentParams, Post, UploadPictureParams } from './posts.types'

const MAIN_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:8080'

const getAllPosts = createAsyncThunk('posts/getAllPosts', async (_, { rejectWithValue }) => {
  const response = await fetch(`${MAIN_URL}/post/`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await response.json()

  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue({ errorMessage: data.result })
  }

  return data.result
})

const createPost = createAsyncThunk('posts/createPost', async (post: Pick<Post, 'title' | 'username'>, { rejectWithValue }) => {
  const payload = JSON.stringify(post)

  const response = await fetch(`${MAIN_URL}/post`, {
    method: 'POST',
    body: payload,
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await response.json()

  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(data)
  }

  return data.result
})

const uploadPicture = createAsyncThunk(
  'posts/uploadPicture',
  async ({ postId, pictureFormData }: UploadPictureParams, { rejectWithValue }) => {
    const createPictureResponse = await fetch(`${MAIN_URL}/post/${postId}/picture`, { method: 'POST', body: pictureFormData })

    const postData = await createPictureResponse.json()

    if (createPictureResponse.status < 200 || createPictureResponse.status >= 300) {
      return rejectWithValue(postData)
    }

    return postData.result
  }
)

const deletePost = createAsyncThunk('posts/deletePost', async (postId: number, { rejectWithValue }) => {
  const response = await fetch(`${MAIN_URL}/post/${postId}`, { method: 'DELETE' })
  const data = await response.json()

  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(data)
  }

  return { postId }
})

const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ title, likes, dislikes, id }: Pick<Post, 'title' | 'likes' | 'dislikes' | 'id'>, { rejectWithValue }) => {
    const payload = JSON.stringify({
      title,
      likes,
      dislikes
    })

    const response = await fetch(`${MAIN_URL}/post/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    })

    const data = await response.json()

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data)
    }
    return data.result
  }
)

const addComment = createAsyncThunk('posts/addComment', async (addComment: AddCommentParams, { rejectWithValue }) => {
  const payload = JSON.stringify(addComment)
  const response = await fetch(`${MAIN_URL}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  const data = await response.json()
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(data)
  }
  return { newComment: data.result }
})

const deleteComment = createAsyncThunk('posts/deleteComment', async (commentId: number, { rejectWithValue }) => {
  const response = await fetch(`${MAIN_URL}/comment/${commentId}`, { method: 'DELETE' })

  const data = await response.json()

  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(data)
  }
  return { commentId, postId: data.result.postId }
})

const editComment = createAsyncThunk('posts/editComment', async (params: ChangeCommentParams, { rejectWithValue }) => {
  const { id, likes, dislikes, text } = params
  const payload = JSON.stringify({ id, likes, dislikes, text })
  const response = await fetch(`${MAIN_URL}/comment/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })

  const data = await response.json()

  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(data)
  }

  return data.result
})

const filterPosts = createAsyncThunk('posts/filterPosts', async (keyword: string, { rejectWithValue }) => {
  const response = await fetch(`${MAIN_URL}/post/search/${keyword}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()

  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(data)
  }

  return data.result
})

const paginationOfPosts = createAsyncThunk('posts/paginationOfPosts', async (pageNumber: number, { rejectWithValue }) => {
  const response = await fetch(`${MAIN_URL}/post/page/${pageNumber}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()

  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(data)
  }

  return data
})

export const PostsThunks = {
  createPost,
  uploadPicture,
  getAllPosts,
  editPost,
  deletePost,
  addComment,
  deleteComment,
  editComment,
  filterPosts,
  paginationOfPosts
}
