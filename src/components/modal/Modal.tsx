import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export interface ModalProps {
  open?: boolean;
  title?: string;
  className?: string;
  id?: string;
  onClose: () => void;
  children?: JSX.Element | JSX.Element[];
}

const Modal = ({
  open,
  onClose,
  children,
  title,
  id,
  className = "",
}: ModalProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:max-w-3xl ">
                <div
                  className={
                    "bg-[#f4f4f4] overflow-auto max-h-96 flex gap-8 p-10 w-full sm:w-fit flex-col rounded-lg " +
                    className
                  }
                  id={id}
                >
                  {title && <Dialog.Title>{title}</Dialog.Title>}
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
