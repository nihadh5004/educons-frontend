import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';
import { baseUrl } from '../../Store/BaseUrl';
import CommentDrawer from './CommentDrawer';
import BlogLikes from './BlogLikes';
import BlogSave from './BlogSave';
import WatsappShareBlog from './WatsappShareBlog';
import {FaRegComment} from 'react-icons/fa'
import Comments from './Comments';

const BlogDetailPage = ({is_admin}) => {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUrl = window.location.href;


  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`${baseUrl}/blogs/${id}/`);
        // Set blog data...
        setBlogData(response.data);

        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setIsLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);
  
  const blockBlog = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}/block-blog/${id}/`);
      console.log('Blog blocked success:', response.data.blog_data);
      setBlogData(response.data.blog_data);
      setIsLoading(false);
      // Handle success (e.g., update the UI, show a message)
    } catch (error) {
      console.error('Error blocking blog:', error);
      // Handle error (e.g., show an error message)
    }
  };
  
  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments');
    if (commentsSection) {
      const yOffset = commentsSection.getBoundingClientRect().top + -100;
      window.scrollTo({
        top: window.scrollY + yOffset,
        behavior: 'smooth', // Add smooth scrolling effect
      });
    }
  };
  
  return (
    <div>
      {isLoading ? (
        <div className='flex justify-center p-16 h-[900px]'>
          <Spinner />
        </div>
      ) : (
        <div className='bg-[#E9F8F3B2] w-full'>
          <div className='flex justify-center py-4 w-full '>
            <img src={`${baseUrl}${blogData.image}`} alt="" className='md:w-5/6 p-2 md:h-[500px]' />
          </div>
          <div className='md:ml-16 md:px-16 md:py-3 p-2'>
            <div className='flex justify-between'>
            <h1 className='md:text-4xl text-2xl py-1'>{blogData.heading}</h1>
            {is_admin ? (
    blogData.is_active ? (
        <button className='border bg-red-500 p-2' onClick={blockBlog}>Block</button>
    ) : (
        <button className='border bg-green-500 p-2' onClick={blockBlog}>UnBlock</button>
    )
) :
(
  <div></div>
)}
            </div>
            <h1 className='text-gray-500'>{blogData.username}, on {new Date(blogData.created_date).toLocaleDateString()}</h1>
            <div class=" mt-5 border border-t-1 border-b-1 border-l-0 border-r-0 border-gray-300 p-2 relative">
              <div className='flex gap-3'>
                <div>
              <BlogLikes blogId={id}/>
                </div>
              <FaRegComment size={20} onClick={scrollToComments}/>
              <div className='flex ml-auto items-center justify-center gap-3 '>
              <div className='flex  gap-3'>

              <WatsappShareBlog url={currentUrl}  />
              <BlogSave blogId={id}/>
              </div>
              </div>
              </div>
            </div>

            <p className='mt-4 mb-5'>{blogData.content}</p>
            <div id="comments" className="mt-4 mb-5">
  <Comments blogId={id} />
</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailPage;
