
import React ,{useState,useEffect} from 'react'
import {PiStudentBold ,PiBooks} from 'react-icons/pi'
import {FaUsers} from 'react-icons/fa'
import {MdPendingActions} from 'react-icons/md'
import axios from 'axios'
import { baseUrl } from '../../Store/BaseUrl'

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [userlist,setUserlist]=useState([])

  useEffect(() => {
    axios
      .get(`${baseUrl}/get-admin-dashboard/`)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        setData(response.data);
        setUserlist(response.data.userlist)
      })
      .catch((err) => {
        // Handle error
        console.log(err);
      });
  }, []);


  return (
    <div className='bg-black h-screen'>
    <div>
        
        <div  className='md:flex'>
          <div>

          <p className='text-4xl md:text-6xl md:ml-20 text-center md:text-left text-white md:mt-14 mt-7'>Monitor health of  your business</p>
          <p className='md:ml-20 mt-2 md:text-left text-center text-gray-500 md:text-lg text-xs'>Control and analyze your data in the easiest way</p>
          </div>
          <div className='hidden md:flex h-[200px] w-1/2 flex ml-auto'>
            <img src='' alt="" className='ml-auto'/>
          </div>
        </div>
        <div className='md:flex  md:px-24 px-7 gap-24 mt-20 '>
          
            <div className='h-64 w-64 rounded-xl md:mt-0 mt-4 md:ml-0 ml-7 shadow-lg shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-[#dcf5f4]'>
              <div className='flex p-6 w-full justify-between'>
              <p className=' text-xl'>Students</p>
              <p><PiStudentBold size={30} /></p>
              </div>
              <div className='flex justify-center'>
                <img src='' alt=""  className='h-[120px] '/>
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
                <img src='' alt=""  className='h-[120px] '/>
              </div>
              <div>
                <p className='text-5xl ml-5'>{data.courses}</p>
              </div>
            </div>
            <div className='h-64 w-64 rounded-xl shadow-lg md:mt-0 mt-4  md:ml-0 ml-7 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-[#dcb9fa]'>
            <div className='flex p-6 w-full justify-between'>
              <p className=' text-xl'>Users</p>
              <p><FaUsers size={30}/></p>
              </div>
              <div className='flex justify-center'>
                <img src='' alt=""  className='h-[120px] '/>
              </div>
              <div>
                <p className='text-5xl ml-5'>{data.users}</p>
              </div>
            </div>
            <div className='h-64 w-64 rounded-xl shadow-lg md:mt-0 mt-4  md:ml-0 ml-7 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-[#ecb7dc]'>
            <div className='flex p-6 w-full justify-between'>
              <p className=' text-xl'>Pendings</p>
              <p><MdPendingActions size={30}/></p>
              </div>
              <div className='flex justify-center'>
                <img src='' alt=""  className='h-[120px] '/>
              </div>
              <div>
                <p className='text-5xl ml-5'>{data.pendings}</p>
              </div>
            </div>
            
        </div>
    </div>
    <div class="relative overflow-x-auto p-14 bg-black">
  <table class="w-full text-sm text-left bg-black text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-black">
      <tr>
        <th scope="col" class="px-6 py-3">
          Username
        </th>
        <th scope="col" class="px-6 py-3">
          email
        </th>
        <th scope="col" class="px-6 py-3">
          contact
        </th>
        <th scope="col" class="px-6 py-3">
          status
        </th>
      </tr>
    </thead>
    <tbody>
      {userlist.map((user, index) => (
        <tr key={index} class={`border-b ${index % 2 === 0 ? "bg-black" : "bg-black dark:bg-gray-800"}`}>
          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
            {user.username}
          </th>
          <td class="px-6 py-4">{user.email}</td>
          <td class="px-6 py-4">{user.phone}</td>
          <td class="px-6 py-4 ">{user.is_active ? "active" : "in-active"} </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  )
}

export default DashboardPage