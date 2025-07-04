import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { type ReactNode } from "react";
import Button from "./Button";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children?: ReactNode;
}

export default function Modal({ isOpen, title, children, closeModal }: IProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 "
        onClose={closeModal}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl shadow-sm bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              {/* Close Icon */}
              <Button
                onClick={closeModal}
                className="absolute duration-200 cursor-pointer top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <X size={30} />
              </Button>
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black"
                >
                  {title}
                </DialogTitle>
              )}

              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
