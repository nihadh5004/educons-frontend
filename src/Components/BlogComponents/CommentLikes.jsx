import React ,{useState} from 'react'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

const CommentLikes = () => {
  const [liked,setLiked] =useState(false)

  const handleCommentLike=()=>{
    
  }
  return (
    <div className='text-gray-500 w-full'>        
      <p onClick={handleCommentLike}>Like</p>
    </div>
  )
}

export default CommentLikes