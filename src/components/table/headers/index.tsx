'use client'

import useQueryParams from "../../../hooks/useQueryParams";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export interface HeaderProps {
  label: string;
  field?: string;
}

const Headers = ({ headers }: { headers?: HeaderProps[] }) => {
  const { query, setQuery } = useQueryParams();
  return headers && headers?.length > 0 && (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
      <tr>
        {headers?.map((item, index) => {
          const sort: any = {};
          const fieldName = `sort[${item.field}]`;
          const selected = query[fieldName] != undefined;
          const value = query[fieldName];
          if (item.field) sort[item.field] = !value || value == "1" ? -1 : 1;

          return (
            <th
              key={index}
              scope="col"
              className="px-4 py-3"
              style={!item.field ? undefined : { cursor: "pointer" }}
              onClick={() => {
                const temp = { ...query };
                Object.keys(temp).map((key) => {
                  key.includes("sort") ? delete temp[key] : key;
                });
                temp.sort = sort;
                setQuery(temp, true);
              }}
            >
              <div className="w-full flex items-center justify-between gap-2">
                <div>{item.label}</div>
                {selected &&
                  item.field &&
                  (value == "-1" ? <FaAngleUp /> : <FaAngleDown />)}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Headers;
