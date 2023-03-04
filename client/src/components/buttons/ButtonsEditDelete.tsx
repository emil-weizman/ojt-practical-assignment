import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Post } from 'store/posts/posts.types'

type Props = {
  post: Post
  onPostEdit: (postId: number) => void
  onPostDelete: (postId: number) => void
}

export const ButtonsEditDelete: React.FC<Props> = ({ post, onPostEdit, onPostDelete }) => {
  return (
    <div className="ojt_edit_delete_icons">
      <FontAwesomeIcon className="ojt_icon" icon={['fas', 'pen']} onClick={() => onPostEdit(post.id)} />
      <FontAwesomeIcon className="ojt_icon" icon={['fas', 'trash']} onClick={() => onPostDelete(post.id)} />
    </div>
  )
}
