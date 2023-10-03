import React from 'react'
import {AiOutlineWhatsApp} from 'react-icons/ai'
import { WhatsappShareButton } from 'react-share';

const WatsappShareBlog = ({url}) => {
    const messageWithLink = `${url}`
  return (
    <div>
        <WhatsappShareButton url={messageWithLink}
          >
         <AiOutlineWhatsApp
              size={20}
              className='ml-auto'/>
        </WhatsappShareButton>
    </div>
  )
}

export default WatsappShareBlog