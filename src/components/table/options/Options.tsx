import { Menu, Transition } from "@headlessui/react";
import { FaEllipsisV } from "react-icons/fa";
import { Fragment } from "react";
import Link from "next/link";

export interface OptionItemProps {
  value?: string;
  href?: string;
  onClick?: () => void;
}

export interface OptionsProps {
  options?: OptionItemProps[];
}

const Options = ({ options }: OptionsProps) => {
  return options && options?.length > 0 && (
    <Menu as="div">
      <div className="flex items-center justify-center text-secondary">
        <Menu.Button>
          <FaEllipsisV />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="flex flex-col px-2 absolute right-0 z-10 py-2 m-4 origin-top-right bg-white rounded-md shadow-lg w-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options?.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <Link
                  className={`${active && "bg-primary-500"
                    } p-2 rounded-lg hover:bg-accent text-sm`}
                  href={item.href ? item.href : ""}
                >
                  {item.value}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Options;
