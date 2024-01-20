"use client";

import Modal from "../../modal/Modal";
import Button from "../../button/Button";
import Form from "../../form/Form";
import { InputProps } from "../../form/field/Field";
import useQueryParams from "../../../hooks/useQueryParams";
import { FaFilter } from "react-icons/fa";

interface FilterProps {
  filters?: InputProps[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Filter = ({ filters, open, setOpen }: FilterProps) => {
  const { query, setQuery } = useQueryParams();

  const onSubmit = (data: any) => {
    setQuery({ ...data, page: 1, limit: 10 });
    setOpen(false);
  };

  return filters && (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="secondary"
        className={"py-[11px]"}
      >
        <FaFilter />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {/* Filters */}
        <Form fields={filters} onSubmit={onSubmit} values={query} />

        {/* Buttons */}
        {/* <div className="flex gap-2">
          {actions?.map((item, index) => (
            <Button key={index} {...item}>
              {item.children}
            </Button>
          ))}
        </div> */}
      </Modal>
    </div>
  );
};

export default Filter;
