import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface DropdownProps {
    name: string,
    options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ name, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    closeDropdown();
  };

  const getButtonClasses = () => {
    let buttonClasses =
      'h-12 self-center w-full border border-gray-300 rounded focus:outline-none focus:ring-2 placeholder-gray focus:ring-red-500 text-left pl-3 truncate';

    if (selectedOption) {
      buttonClasses += ' text-black';
    } else {
      buttonClasses += ' text-gray-400';
    }

    return buttonClasses;
  };

  return (
    <div className="relative self-center w-11/12 mt-2 mb-4">
      <div className="relative flex w-full">
        <button type="button" className={getButtonClasses()} onClick={toggleDropdown}>
          {selectedOption || name}
        </button>
        <button
          className="flex absolute top-1/2 h-12 w-10 right-0 items-center pointer-event-stroke
                    -translate-y-1/2
                    rounded-r-xl"
          onClick={toggleDropdown}
        >
          <HiOutlineChevronDown className="text-gray-400 w-full" />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="origin-top-right absolute right-0 w-full 
                        rounded shadow-lg bg-white ring-1 
                         ring-black ring-opacity-5 z-[100] border-2 border-gray-300"
          >
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              className="max-h-48 overflow-y-auto"
            >
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className={`block h-12 text-sm text-gray-700 border-b-[1px] ${
                      index === options.length - 1
                        ? 'border-transparent hover:bg-gray-100 hover:rounded-b w-full'
                        : index === 0
                        ? 'border-gray-300 hover:bg-gray-100 hover:rounded-t w-full'
                        : 'border-gray-300 hover:bg-gray-100 w-full'
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;