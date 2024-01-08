import React from 'react'
import { useState,useEffect } from 'react'
import ProblemExport from './ProblemMore/ProblemExport';


const HelpProblem = () => {
    const [isShow, setIsShow] = useState(false);
    const [select, setSelect] = useState('Chọn vấn đề của bạn')
    return (
    <div className='mx-5 my-5'>
        <h1 className='text-2xl font-semibold text-gray-600'>
            Trung tâm trợ giúp
        </h1>
        <p className='font-normal text-sm text-gray-500 mt-5'>
            Bạn có thể tìm thấy hướng dẫn cho các vấn đề thường gặp tại đây
        </p>
        <div className='mt-5 flex flex-wrap-reverse gap-4 '>
            <button
            onClick={() => {setIsShow(true), setSelect('Price')}} 
            className='text-blue-500 hover:text-sky-700 font-medium text-sm '
            >
                <span>
                    Bảng giá dịch vụ
                </span>
            </button>
            <button
            onClick={() => {setIsShow(true), setSelect('Terms')}} 
            className='text-blue-500 hover:text-sky-700 font-medium text-sm '
            >
                <span>
                    Điều khoản và chính sách 
                </span>
            </button>
            <button
            onClick={() => {setIsShow(true),setSelect('OrderProcess')}} 
            className='text-blue-500 hover:text-sky-700 font-medium text-sm '
            >
                <span>
                    Quy trình vận hành đơn hàng
                </span>
            </button>
            <button
            onClick={() => {setIsShow(true),setSelect('Customer')}} 
            className='text-blue-500 hover:text-sky-700 font-medium text-sm '
            >
                <span>
                    Giới thiệu khách hàng
                </span>
            </button>
            <button
            onClick={() => {setIsShow(true),setSelect('Sale')}} 
            className='text-blue-500 hover:text-sky-700 font-medium text-sm '
            >
                <span>
                    Chương trình ưu đãi
                </span>
            </button>
            <button
            onClick={() => {setIsShow(true),setSelect('Support')}} 
            className='text-blue-500 hover:text-sky-700 font-medium text-sm '
            >
                <span>
                    Các kênh hỗ trợ khách hàng
                </span>
            </button>
            <button
            onClick={() => {setIsShow(true),setSelect('Pay')}} 
            className='text-blue-500 hover:text-sky-700 font-medium text-sm '
            >
                <span>
                    Phương thức thanh toán và chính sách trả trước
                </span>
            </button>
        </div>
        {isShow && <ProblemExport onClose={() => setIsShow(false)} select={select}/>
        }
        
    </div>
  )
}

export default HelpProblem