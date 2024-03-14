import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectItem,
} from "@nextui-org/react";

const CommonDropdown = ({
  name,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  return (

    <Select
      placeholder={selectedOption || name}
      classNames={{
        listboxWrapper: "max-h-[300px] no-scrollbar",
        trigger: `text-xs md:text-sm border border-gray-300 rounded h-12 w-11/12 self-center mb-2 ${selectedOption ? "" : "text-gray-600"}`,
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md text-black transition-opacity hover:text-blue-500",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-white",
          content: "p-0 bg-white rounded-xl border border-gray-300",
        },
      }}
      id="district"
      aria-label=".form-select-sm"
      value={selectedOption}
    >
      {options.map((option, index) => (
        <SelectItem key={index} value={option} onClick={() => setSelectedOption(option)}>
          {option}
        </SelectItem>
      ))}
    </Select>
  );
};

export default CommonDropdown;
