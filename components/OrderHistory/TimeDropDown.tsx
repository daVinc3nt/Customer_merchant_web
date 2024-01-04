import React, { useState } from 'react';

const TimeDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');

  const handleApply = () => {
    console.log(`Querying data htmlFor time: ${time}`);
    setIsOpen(false);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <div className="relative p-4 z-20 ">
      <button onClick={() => setIsOpen(!isOpen)} className="
      bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2
      w-16 h-8
      sm:w-32 sm:h-10 
      rounded-full
      flex items-center justify-center
      ">
        <span className='text-xs'>Thời gian</span>
      </button>
      {isOpen && (
        <div className="absolute mt-2 space-y-2 bg-white text-black border border-gray-200 rounded shadow-lg ">
          <div className='mx-2 my-2'>
            <input type="radio" id="1hour" name="time" value="1 giờ trước" onChange={handleTimeChange} />
            <label htmlFor="1hour"> 1 ngày trước</label>
          </div>
          <div className='mx-2 my-2'>
            <input type="radio" id="1week" name="time" value="1 tuần trước" onChange={handleTimeChange} />
            <label htmlFor="1week"> 1 tuần trước</label>
          </div>
          <div className='mx-2 my-2'>
            <input type="radio" id="1month" name="time" value="1 tháng trước" onChange={handleTimeChange} />
            <label htmlFor="1month"> 1 tháng trước</label>
          </div>
          <div className='mx-2 my-2'>
            <input type="radio" id="1month" name="time" value="1 tháng trước" onChange={handleTimeChange} />
            <label htmlFor="1month"> Tất cả</label>
          </div>
          <div className="flex justify-end space-x-2 mt-2 ">
            <button onClick={() => setIsOpen(false)} className="px-4  text-white bg-red-500 rounded hover:bg-red-400">
              Đóng
            </button>
            <button onClick={handleApply} className="px-4 text-white bg-green-500 rounded hover:bg-green-400">
              Áp dụng
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default TimeDropDown;
