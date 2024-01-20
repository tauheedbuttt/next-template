'use client'
import { FaTimes } from "react-icons/fa";
import useQueryParams from "../../../hooks/useQueryParams";

export interface ChipsProps {
  exclude?: string[];
  include?: string[];
  setOpen: (open: boolean) => void;
}

const Chips = ({ exclude = [], include = [], setOpen }: ChipsProps) => {
  const { query, setQuery } = useQueryParams();

  const excluded = ["page", "limit", "text", ...exclude];
  const included = [...include];

  const removeFilter = (key: any) => {
    const data = { ...query };
    data[key] = "";
    setQuery(data);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-3 pl-2">
      {Object.keys(query)
        ?.filter((item) => !excluded.includes(item))
        ?.filter((item) => (!included?.length ? true : included.includes(item)))
        ?.filter((item) => !!query[item])
        .map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-accent bg-secondary rounded cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {query[item]}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFilter(item);
              }}
              type="button"
              className="inline-flex items-center p-1 ml-2 text-sm text-accent bg-transparent rounded-sm hover:opacity-80 "
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <FaTimes />
            </button>
          </span>
        ))}
    </div>
  );
};

export default Chips;
