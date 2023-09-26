import React from 'react'
const ProfilePage = () => {
  return (
    <div class="md:p-16 p-3 bg-[#E9F8F3B2]">
      <div class="p-7 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-24">
        <div class="grid grid-cols-1 md:grid-cols-3">
        
        <div class="relative">
          <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
          </div>
        </div>

            <div class=" md:flex  justify-between mt-32 md:mt-0 md:justify-center">
              <div className='border p-2 mt-2 hover:bg-[#E9F8F3B2]'>
                <button >Applications</button>
              </div>
              <div className='border p-2 md:ml-2 mt-2 hover:bg-[#E9F8F3B2]'>
                <button >Rewards</button>
              </div>
              <div className='border p-2  md:ml-2 mt-2 hover:bg-[#E9F8F3B2]'>
                <button >Edit Profile</button>
              </div>
              
            </div>
              
              

        </div>

        <div class="mt-20 text-center  pb-12">
          <h1 class="text-4xl font-medium text-gray-700">Jessica Jones</h1>
          <p class="font-light text-gray-600 mt-3">Email : jessica@gmail.com</p>
          <p class="font-light text-gray-600 mt-3">Contact : +919876543210</p>
          <p class="font-light text-gray-600 mt-3">Bucharest, Romania</p>

          <p class="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
          <p class="mt-2 text-gray-500">University of Computer Science</p>
        </div>

      

      </div>
    </div>
  )
}

export default ProfilePage