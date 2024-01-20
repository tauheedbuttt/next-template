"use client";
import useQueryParams from "@/hooks/useQueryParams";
import Link from "next/link";

interface Footer {
  pages?: number;
  total?: number;
}

const Footer = ({ pages = 0, total }: Footer) => {
  const { query, href } = useQueryParams();

  const page = query?.page;
  const limit = query?.limit;

  const setPage = (page: number) =>
    href({
      page: page < 1 ? 1 : page > pages ? pages : page,
    })

  const showing = {
    start: parseInt(page) * parseInt(limit) - parseInt(limit) + 1,
    end: parseInt(page) * parseInt(limit),
    total,
  };

  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
    >
      {!(total && total > 0) ? null : (
        <span className="text-sm font-normal text-gray-500  ">
          Showing
          <span className="font-semibold text-gray-900  mx-1">
            {showing.start}-{showing.end}
          </span>
          of
          <span className="font-semibold text-gray-900  ml-1">
            {showing.total}
          </span>
        </span>
      )}
      {pages > 1 && (
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <Link
              href={setPage(parseInt(page) - 1)}
              className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700     "
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
          {Array.from({ length: pages }).map(
            (_item, index) =>
              index - 2 < parseInt(page) &&
              parseInt(page) < index + 4 && (
                <li key={index}>
                  <Link
                    href={setPage(index + 1)}
                    className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${parseInt(page) == index + 1
                      ? "text-blue-600"
                      : "text-gray-500"
                      } bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  `}
                  >
                    {index + 1}
                  </Link>
                </li>
              )
          )}
          <li>
            <Link
              href={setPage(parseInt(page) + 1)}
              className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Footer;
