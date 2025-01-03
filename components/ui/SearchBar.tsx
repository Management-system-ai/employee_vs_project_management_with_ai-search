'use client';
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchBarProps } from '@/types/types';

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search projects...'
}) => {
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
        className={`rounded-bl-md rounded-tl-md border px-4 py-2 transition-all ${isFocused ? 'border-red-600 focus:outline-none' : 'border-red-500'}`}
      />
      <button
        onClick={() => onSearch(query)}
        className="flex h-[42px] items-center justify-center rounded-br-md rounded-tr-md bg-red-600 pl-3 pr-3 text-white"
      >
        <AiOutlineSearch className="text-lg" />
      </button>
    </div>
  );
};

export default SearchBar;
