import { Post } from 'store/posts/posts.types'

export const validatePostImage = (value: FileList, post?: Post): boolean | string => {
  const isImageAdded = value.length > 0

  if (post && !isImageAdded) return true

  if (!isImageAdded) {
    return 'Please upload an image.'
  }

  const allowedImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/avif']
  const imageType = value[0].type
  const imageSize = value[0].size

  if (allowedImage.indexOf(imageType) < 0) {
    return 'Image invalid, please upload jpeg/png/gif/bmp.'
  }

  if (imageSize > 5e6) {
    return 'Image size is too large, maximum allowed 5 Mb.'
  }

  return true
}
