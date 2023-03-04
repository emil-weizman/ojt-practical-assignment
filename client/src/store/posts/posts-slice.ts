import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store/store'
import { PostsThunks } from './posts-thunks'
import { Post, PostsState } from './posts.types'

const initialState: PostsState = {
  allPosts: [],
  currentPage: 1,
  total: 0,
  totalPages: 0,
  loading: false,
  filtered: false,
  error: '',
  initialized: false
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage
    }
  },
  extraReducers: builder => {
    /////////////////////////////CreatePost////////////////////////////////
    builder.addCase(PostsThunks.createPost.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.createPost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.allPosts.push(action.payload)
      state.error = null
      state.loading = false
    })
    builder.addCase(PostsThunks.createPost.rejected, (state, action: any) => {
      state.loading = false
      // TODO: check errorMessage type which is send from THUNK
      if (action.payload) {
        state.error = action.payload
      } else {
        const { name, code, message } = action.error
        state.error = `name: ${name}; code: ${code} messager: ${message}`
      }
    })
    /////////////////////////////uploadPicture////////////////////////////////
    builder.addCase(PostsThunks.uploadPicture.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.uploadPicture.fulfilled, (state, action) => {
      const postIndex = state.allPosts.findIndex(post => post.id === action.payload.id)

      state.error = null
      state.loading = false

      if (postIndex === -1) return

      state.allPosts[postIndex] = action.payload
    })
    builder.addCase(PostsThunks.uploadPicture.rejected, (state, action) => {
      const { name, code, message } = action.error
      state.error = `name: ${name}; code: ${code} messager: ${message}`
      state.loading = false
    })
    /////////////////////////////getAllPosts////////////////////////////////
    builder.addCase(PostsThunks.getAllPosts.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.getAllPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload
      state.error = null
      state.loading = false
    })
    builder.addCase(PostsThunks.getAllPosts.rejected, (state, action: any) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        const { name, code, message } = action.error
        state.error = `name: ${name}; code: ${code} messager: ${message}`
      }
    })
    /////////////////////////////deletePost////////////////////////////////
    builder.addCase(PostsThunks.deletePost.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.deletePost.fulfilled, (state, action) => {
      state.allPosts = state.allPosts.filter(item => item.id !== action.payload.postId)
      state.error = null
      state.loading = false
    })
    builder.addCase(PostsThunks.deletePost.rejected, (state, action: any) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        const { name, code, message } = action.error
        state.error = `name: ${name}; code: ${code} messager: ${message}`
      }
    })
    /////////////////////////////editPost////////////////////////////////
    builder.addCase(PostsThunks.editPost.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.editPost.fulfilled, (state, action) => {
      state.allPosts = state.allPosts.map(post => (post.id === action.payload.id ? (post = action.payload) : post))
      state.error = null
      state.loading = false
    })
    builder.addCase(PostsThunks.editPost.rejected, (state, action: any) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        const { name, code, message } = action.error
        state.error = `name: ${name}; code: ${code} messager: ${message}`
      }
    })
    /////////////////////////////addComment////////////////////////////////
    builder.addCase(PostsThunks.addComment.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.addComment.fulfilled, (state, action) => {
      const { newComment } = action.payload

      const postIndex = state.allPosts.findIndex(post => post.id === newComment.postId)

      state.error = null
      state.loading = false

      if (postIndex === -1) return

      state.allPosts[postIndex].comments.push(newComment)
    })
    builder.addCase(PostsThunks.addComment.rejected, (state, action: any) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        const { name, code, message } = action.error
        state.error = `name: ${name}; code: ${code} messager: ${message}`
      }
    })
    /////////////////////////////addComment////////////////////////////////

    /////////////////////////////deleteComment////////////////////////////////
    builder.addCase(PostsThunks.deleteComment.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.deleteComment.fulfilled, (state, action) => {
      const { commentId, postId } = action.payload
      const postIndex = state.allPosts.findIndex(post => post.id === postId)

      state.error = null
      state.loading = false

      if (postIndex === -1) return

      state.allPosts[postIndex].comments = state.allPosts[postIndex].comments.filter(comment => comment.id !== commentId)
    })
    builder.addCase(PostsThunks.deleteComment.rejected, (state, action: any) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        const { name, code, message } = action.error
        state.error = `name: ${name}; code: ${code} messager: ${message}`
      }
    })
    /////////////////////////////deleteComment////////////////////////////////

    /////////////////////////////editComment////////////////////////////////

    builder.addCase(PostsThunks.editComment.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.editComment.fulfilled, (state, action) => {
      const newComment = action.payload
      const postIndex = state.allPosts.findIndex(post => post.id === newComment.postId)

      state.error = null
      state.loading = false

      if (postIndex === -1) return

      state.allPosts[postIndex].comments = state.allPosts[postIndex].comments.map(comment =>
        comment.id === newComment.id ? newComment : comment
      )
    })
    builder.addCase(PostsThunks.editComment.rejected, (state, action: any) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        const { name, code, message } = action.error
        state.error = `name: ${name}; code: ${code} messager: ${message}`
      }
    })
    /////////////////////////////editComment////////////////////////////////

    /////////////////////////////filterPosts////////////////////////////////
    builder.addCase(PostsThunks.filterPosts.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.filterPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload
      state.filtered = true
      state.error = null
      state.loading = false
    })
    builder.addCase(PostsThunks.filterPosts.rejected, (state, action: any) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        const { name, code, message } = action.error
        state.error = `name: ${name}; code: ${code} messager: ${message}`
      }
    })

    /////////////////////////////filterPosts////////////////////////////////

    /////////////////////////////paginationOfPosts////////////////////////////////

    builder.addCase(PostsThunks.paginationOfPosts.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(PostsThunks.paginationOfPosts.fulfilled, (state, action) => {
      state.total = action.payload.total
      state.totalPages = action.payload.totalPages
      state.allPosts = action.payload.result
      state.filtered = false
      state.initialized = true

      state.error = null
      state.loading = false
    })
    builder.addCase(PostsThunks.paginationOfPosts.rejected, (state, action: any) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        const { name, code, message } = action.error
        state.error = `name: ${name}; code: ${code} messager: ${message}`
      }
    })
    /////////////////////////////paginationOfPosts////////////////////////////////
  }
})

export const PostsActions = postsSlice.actions
export const PostsReducer = postsSlice.reducer

export const selectPosts = (state: RootState) => state.posts
export const selectAllPosts = (state: RootState) => state.posts.allPosts
export const selectTotalPages = (state: RootState) => state.posts.totalPages

export const selectPost = (postId: number) => {
  return createSelector(selectAllPosts, allPosts => allPosts.find(post => post.id === postId))
}

export const selectComment = (commentId: number) => {
  return createSelector(selectAllPosts, allPosts => {
    return allPosts.flatMap(post => post.comments).find(comment => comment.id === commentId)
  })
}
