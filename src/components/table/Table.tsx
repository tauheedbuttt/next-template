"use client"

import Footer from "./footer";
import Search from "./search";
import Options, { OptionItemProps } from "./options/Options";
import Filter from "./filter/Filter";
import Button from "../button/Button";
import Chips from "./chips/Chips";
import { Suspense, useState } from "react";
import Body, { DataProps } from "./body/Body";
import { InputProps } from "../form/field/Field";
import Headers, { HeaderProps } from "./headers";
import Loader from "../loader/Loader";

export interface ActionProps {
  variant: string;
  isLoading?: boolean;
  children: JSX.Element | JSX.Element[] | string;
  onClick: () => void;
}

export interface Table {
  pages?: number;
  data?: DataProps;
  headers?: HeaderProps[];
  children?: JSX.Element | JSX.Element[];
  filters?: InputProps[];
  isLoading?: boolean;
  isFetching?: boolean;
  noSearch?: boolean;
  showChips?: boolean;
  actions?: ActionProps[];
  options?: OptionItemProps[];
  include?: string[];
  exclude?: string[];
  body?: string;
  className?: string;
}

const Table = ({
  headers,
  children,
  data,
  filters,
  isLoading = false,
  isFetching = false,
  actions,
  noSearch = false,
  include,
  exclude,
  options,
  showChips = false,
  body,
  className = "",
}: Table) => {
  const [open, setOpen] = useState(false);
  const isHeader =
    !noSearch ||
    filters ||
    (actions && actions?.length) ||
    (options && options?.length);

  exclude = [
    ...(exclude ? exclude : []),
    ...(headers ? headers : []).map((item) => `sort[${item.field}]`),
  ];
  return (
    <Suspense fallback={<Loader />}>
      <div
        className={`bg-white  relative shadow-md sm:rounded-lg overflow-hidden ${className}`}
      >
        {/* Header */}
        {isHeader && (
          <div className="flex flex-row items-center justify-between gap-2 md:space-y-0 p-4">
            {!noSearch && <Search isLoading={isLoading} />}

            {actions && actions?.length > 0 && (
              <div className="flex gap-2">
                {actions?.map((item, index) => (
                  <Button
                    key={index}
                    variant={item.variant}
                    onClick={item.onClick}
                    isLoading={item.isLoading}
                  >
                    {item.children}
                  </Button>
                ))}
              </div>
            )}

            <Filter open={open} setOpen={setOpen} filters={filters} />
            <Options options={options} />
          </div>
        )}
        {showChips && (
          <Chips include={include} exclude={exclude} setOpen={setOpen} />
        )}

        {/* Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <Headers headers={headers} />
            <Body
              body={body}
              isFetching={isFetching}
              columns={headers?.length}
              data={data}
            >
              {children}
            </Body>
          </table>
        </div>

        <Footer total={data?.total} pages={data?.pages} />
      </div>
    </Suspense>
  );
};

export default Table;