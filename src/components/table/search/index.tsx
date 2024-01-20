"use client";
import { ChangeEvent, FormEvent, useState } from "react";

import { FaSearch } from "react-icons/fa";
import Loader from "../../loader/Loader";
import useQueryParams from "@/hooks/useQueryParams";

export interface SearchProps {
  onSearch?: () => void;
  isLoading?: boolean;
}

const Search = ({ onSearch, isLoading = false }: SearchProps) => {

  const [text, setText] = useState("");
  const { setQuery } = useQueryParams();

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setQuery({ text: e.target.value, page: 1 });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  // useEffect(() => setText(query.text), [query]);

  return (
    <div className="w-full">
      <form className="flex items-center" onSubmit={onSubmit}>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Loader isLoading={isLoading}>
              <FaSearch className="text-gray-500" />
            </Loader>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
            placeholder="Search"
            required
            onChange={setSearch}
            value={text}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
