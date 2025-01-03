import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'; 


const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search projects..." }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`border px-4 py-2 rounded-tl-md rounded-bl-md transition-all 
                    ${isFocused ? 'border-red-600 focus:outline-none' : 'border-red-500'}`} 
      />
      <button
        onClick={() => onSearch(query)}
        className="pl-3 pr-3 h-[42px] bg-red-600 text-white rounded-tr-md rounded-br-md flex items-center justify-center"
      >
        <AiOutlineSearch className="text-lg" />
      </button>
    </div>
  );
};

export default SearchBar;
