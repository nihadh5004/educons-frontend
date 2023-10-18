import React ,{useState,useEffect} from 'react'
import RequestModal from './RequestModal'
import {PiStudentBold ,PiBooks} from 'react-icons/pi'
import {AiOutlinePullRequest} from 'react-icons/ai'
import {MdPendingActions} from 'react-icons/md'
import studentsImg from '../../../assets/26682-removebg-preview.png'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";

import courseImg from '../../../assets/5293-removebg-preview.png'
import requestImg from '../../../assets/2476846-removebg-preview.png'
import PendingsImg from '../../../assets/6931509-removebg-preview.png'
import growthImg from '../../../assets/sl_033020_29450_24-removebg-preview.png'
import { baseUrl } from '../../../Store/BaseUrl'
const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const { userId } = useSelector(
    (state) => state.user
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/get-consultant-dashboard/${userId}/`)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  }, []);
  return (
    <div>
        <div className='border-b py-3 w-full '>
            <div className='w-full flex  '>
              <p className='md:ml-20 ml-5 font-medium md:text-2xl'> Consultancy Dashboard</p>

            <button className='text-white bg-black md:text-sm text-xs p-2 ml-auto mr-3 rounded-lg' onClick={toggleModal}>Request For Student Approval</button>
            </div>
        </div>
        <div  className='md:flex'>
          <div>

          <p className='text-4xl md:text-6xl md:ml-20 text-center md:text-left md:mt-14 mt-7'>Monitor health of  your business</p>
          <p className='md:ml-20 mt-2 md:text-left text-center text-gray-500 md:text-lg text-xs'>Control and analyze your data in the easiest way</p>
          </div>
          <div className='hidden md:flex h-[200px] w-1/2 flex ml-auto'>
            <img src={growthImg} alt="" className='ml-auto'/>
          </div>
        </div>
        <div className='md:flex  md:px-24 px-7 gap-24 mt-20'>
          
            <div className='h-64 w-64 rounded-xl md:mt-0 mt-4 md:ml-0 ml-7 shadow-lg shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-[#dcf5f4]'>
              <div className='flex p-6 w-full justify-between'>
              <p className=' text-xl'>Students</p>
              <p><PiStudentBold size={30} /></p>
              </div>
              <div className='flex justify-center'>
                <img src={studentsImg} alt=""  className='h-[120px] '/>
              </div>
              <div>
                <p className='text-5xl ml-5'>{data.students}</p>
              </div>
            </div>
            <div className='h-64 w-64 rounded-xl shadow-lg md:mt-0  md:ml-0 ml-7 mt-4 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-[#b9c5eb]'>
            <div className='flex p-6 w-full justify-between'>
              <p className=' text-xl'>Courses</p>
              <p><PiBooks size={30}/></p>
              </div>
              <div className='flex justify-center'>
                <img src={courseImg} alt=""  className='h-[120px] '/>
              </div>
              <div>
                <p className='text-5xl ml-5'>{data.courses}</p>
              </div>
            </div>
            <div className='h-64 w-64 rounded-xl shadow-lg md:mt-0 mt-4  md:ml-0 ml-7 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-[#dcb9fa]'>
            <div className='flex p-6 w-full justify-between'>
              <p className=' text-xl'>Requests</p>
              <p><AiOutlinePullRequest size={30}/></p>
              </div>
              <div className='flex justify-center'>
                <img src={requestImg} alt=""  className='h-[120px] '/>
              </div>
              <div>
                <p className='text-5xl ml-5'>{data.requests}</p>
              </div>
            </div>
            <div className='h-64 w-64 rounded-xl shadow-lg md:mt-0 mt-4  md:ml-0 ml-7 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-[#ecb7dc]'>
            <div className='flex p-6 w-full justify-between'>
              <p className=' text-xl'>Pendings</p>
              <p><MdPendingActions size={30}/></p>
              </div>
              <div className='flex justify-center'>
                <img src={PendingsImg} alt=""  className='h-[120px] '/>
              </div>
              <div>
                <p className='text-5xl ml-5'>{data.pending}</p>
              </div>
            </div>
            
        </div>
        <RequestModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  )
}

export default HomePage