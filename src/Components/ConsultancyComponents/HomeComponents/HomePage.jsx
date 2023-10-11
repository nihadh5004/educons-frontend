import React ,{useState} from 'react'
import RequestModal from './RequestModal'
const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
        <div className='border-b py-3 w-full '>
            <div className='w-full flex  '>

        <button className='text-white bg-black p-2 ml-auto mr-3 rounded-lg' onClick={toggleModal}>Request For Student Approval</button>
            </div>
        </div>
        <RequestModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  )
}

export default HomePage