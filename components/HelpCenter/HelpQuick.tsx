import React from 'react'
const HelpQuick = () => {
  return (
    <div className='mx-5 my-5'>
        <h1 className='text-2xl font-semibold text-gray-600'>
            Hỗ trợ nhanh
        </h1>
        <p className='font-normal text-sm text-gray-500 mt-5'>
            Giải đáp thắc mắc nhanh chóng
        </p>
        <button 
        className='
         font-medium text-sm mt-5
        py-2 px-6 rounded
        bg-red-500 text-white
        '
        >
            <span>
                Trò chuyện ngay 
            </span>
        </button>
    </div>
  )
}

export default HelpQuick