import React ,{useState} from 'react'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

const CommentLikes = () => {
  const [liked,setLiked] =useState(false)

  const handleCommentLike=()=>{
    setLiked(!liked);
  }
  return (
    <div className={`w-full ${liked ? 'text-black' : 'text-gray-500'}`}>
      <p onClick={handleCommentLike}>Like</p>
    </div>
  )
}

export default CommentLikes