import React from 'react'
import { useState,useEffect } from 'react'
import { UploadIcon } from '../../Icons';

const SubmitSelect = () => {
    const [select, setSelect] = useState('AS');
    return (
    <div >
        <div className='mt-5'>
            <label  htmlFor="countries" className="block  text-sm   text-black font-semibold">Chọn vấn đề cần báo cáo</label>
            <select id="countries" className=" text-gray-900 text-sm rounded-lg  block w-full p-1 
            " onChange={(e) => setSelect(e.target.value)} value={select} >
                <option value="AS">Hỗ trợ tài khoản</option>
                <option value="IR">Báo cáo sự cố</option>
                <option value="GR">Quy định chung</option>
                <option value="AI">Lỗi ứng dụng</option>
                <option value="OT">Khác</option>
            </select>
        </div>
        <div className='mt-5'>
            {select === 'AS' && (
                <div>
                    <label  htmlFor="countries" className="block  text-sm   text-black font-semibold">Bạn gặp phải vấn đề gì</label>
                    <select id="countries" className=" text-gray-900 text-sm rounded-lg  block w-full p-1 ">
                        <option value="AS1">Quên mật khẩu</option>
                        <option value="AS2">Không thể đăng nhập</option>
                        <option value="AS3">Không nhận được mã xác minh</option>
                        <option value="AS4">Không nhận được email</option>
                        <option value="AS5">Khác</option>
                    </select>
                </div>
            )}
            {select === 'IR' && (
                <div>
                    <label  htmlFor="countries" className="block  text-sm   text-black font-semibold">Bạn gặp phải vấn đề gì</label>
                    <select id="countries" className=" text-gray-900 text-sm rounded-lg  block w-full p-1 ">
                        <option value="IR">Bị hủy đơn hàng</option>
                        <option value="GR">Sai địa chỉ</option>
                        <option value="AI">Khác</option>
                        </select>
                </div>
            )}
            {select === 'GR' && (
                <div>
                    <label  htmlFor="countries" className="block  text-sm   text-black font-semibold">Bạn gặp phải vấn đề gì</label>
                    <select id="countries" className=" text-gray-900 text-sm rounded-lg  block w-full p-1 ">
                        <option value="GR">Quy định chung</option>
                        <option value="AI">Khác</option>
                        </select>
                </div>
            )}
            {select === 'AI' && (
                <div>
                    <label  htmlFor="countries" className="block  text-sm   text-black font-semibold">Bạn gặp phải vấn đề gì</label>
                    <select id="countries" className=" text-gray-900 text-sm rounded-lg  block w-full p-1 ">
                        <option value="AI">Lỗi ứng dụng</option>
                        <option value="AI">Khác</option>
                        </select>
                </div>
            )}
            {select === 'OT' && (
                <div>
                    <label  htmlFor="countries" className="block  text-sm   text-black font-semibold">Bạn gặp phải vấn đề gì</label>
                    <select id="countries" className=" text-gray-900 text-sm rounded-lg  block w-full p-1 ">
                        <option value="OT">Khác</option>
                        </select>
                </div>
            )}
        </div>
        <div className='mt-5'>
            <h1 className='text-sm   text-black font-semibold'>Mô tả thêm vấn đề của bạn</h1>
            <div>
                <textarea className="w-full h-32 p-1 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-indigo-500" 
                placeholder="Hãy mô tả chi tiết vấn đề của bạn để chúng tôi có thể hỗ trợ nhanh nhất"></textarea>
            </div>
        </div>
        <div className='mt-5'>
            <h1 className='text-sm text-red font-semibold'>Ảnh đính kèm</h1>
            <div className='mt-5'>
                <input type="file" className=" text-gray-900" id="upload" style={{display: 'none'}} />
                <label htmlFor="upload" className='flex items-center text-red-500 cursor-pointer border border-red-500 rounded-lg px-7 py-2 w-52 '>
                    <UploadIcon  />
                    <span className='ml-4'>Chọn ảnh</span>
                </label>
            </div>
        </div>
    </div>
  )
}

export default SubmitSelect