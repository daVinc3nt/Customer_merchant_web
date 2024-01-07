import React from 'react'
import { HelpContact } from '../Icons'
const HelpQuick = () => {
  return (
    <div className=' my-5 flex'>
        <HelpContact className='w-20  mt-5'/>
        <div className='mt-5 mx-5'>
            <h1 className='text-2xl font-semibold text-gray-600'>
                Hỗ trợ nhanh    
                <p className='font-normal text-sm text-gray-500 mt-5'>
                    Giải đáp thắc mắc nhanh chóng
                </p>
            </h1>
            
            <button 
            className='
            font-medium text-sm mt-5 py-2 px-6 rounded bg-red-500 text-white '
            >
                <span>
                    Trò chuyện ngay 
                </span>
            </button>
        </div>
    </div>
  )
}

export default HelpQuick