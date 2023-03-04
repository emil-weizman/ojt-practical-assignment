export interface PostsState {
  allPosts: Post[]
  currentPage: number
  total: number
  totalPages: number
  loading: boolean
  filtered: boolean
  error: string | null
  initialized: boolean
}

export interface Post {
  id: number
  username: string
  title: string
  likes: string[]
  dislikes: string[]
  date: string
  comments: Comment[]
  imageSrc: string
}

export interface Comment {
  id: number
  text: string
  username: string
  postId: number
  likes: string[]
  dislikes: string[]
  date: string
}

export type AddCommentParams = {
  text: string
  postId: number
  username: string
}

export type ChangeCommentParams = {
  id: number
  text: string
  likes: string[]
  dislikes: string[]
}

export type ChangePostParams = {
  id: number
  title: string
  likes: string[]
  dislikes: string[]
}

export type UploadPictureParams = {
  postId: number
  pictureFormData: FormData
}
