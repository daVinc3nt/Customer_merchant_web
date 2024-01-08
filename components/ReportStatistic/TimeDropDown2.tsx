import React, { useState } from "react";

const DateInput = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label
          htmlFor="start-date"
          className="block text-sm font-medium text-gray-700"
        >
          Ngày bắt đầu
        </label>
        <input
          type="date"
          id="start-date"
          name="start-date"
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="end-date"
          className="block text-sm font-medium text-gray-700"
        >
          Ngày kết thúc
        </label>
        <input
          type="date"
          id="end-date"
          name="end-date"
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      {startDate > endDate ? (
        <p className="text-red-500">Ngày bắt đầu phải sớm hơn ngày kết thúc</p>
      ) : (
        <p></p>
      )}
      <button
        type="submit"
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Áp dụng
      </button>
    </form>
  );
};

export default DateInput;
