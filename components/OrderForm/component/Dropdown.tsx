import React from "react";
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
            placeholder={selectedOption ? options.find(option => option.value === selectedOption)?.text : name}
            classNames={{
                listboxWrapper: "max-h-[300px] no-scrollbar",
                trigger: `text-xs md:text-sm border border-gray-300 rounded h-12 w-11/12 self-center my-2 ${selectedOption ? "" : "text-gray-600"}`,
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
        >
            {options.map((option, index) => (
                <SelectItem key={index} value={option.value} onClick={() => setSelectedOption(option.value)}>
                    {option.text}
                </SelectItem>
            ))}
        </Select>
    );
};

export default CommonDropdown;
