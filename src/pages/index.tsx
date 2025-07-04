import { useState } from "react";
import NoteCard from "../Components/NoteCard";
import { useAuth } from "../hooks/custom/useAuth";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { AxiosError } from "axios";
import type { IErrorResponse, INote } from "../interfaces";
import Modal from "../Components/ui/Modal";
import Button from "../Components/ui/Button";

const HomePage = () => {
  // state or hooks
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  let errorObj;
  const { token } = useAuth();

  // handler
  const config = {
    headers: {
      token: `3b8ny__${token}`,
    },
  };
  const { data, isLoading, error, isError } = useAuthenticatedQuery({
    queryKey: ["getUserNotes"],
    url: "/notes",
    config: config,
  });

  if (isError) {
    errorObj = error as AxiosError<IErrorResponse>;
  }

  const ToggleModal = () => {
    setIsOpenEdit((prev) => !prev);
  };
  const handleDelelte = () => {
    console.log("delete");
  };

  // render
  const renderNotesUser = data?.notes?.map((note: INote, index: number) => (
    <NoteCard
      key={note._id}
      index={index}
      note={note}
      onEdit={ToggleModal}
      onDelete={handleDelelte}
    />
  ));

  if (isLoading) return <h1>loading ....</h1>;
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isError ? <h1>{errorObj?.response?.data.msg}</h1> : renderNotesUser}
      </div>
      <Modal closeModal={ToggleModal} isOpen={isOpenEdit} title="Edit Note">
        {" "}
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Content
            </label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            onClick={ToggleModal}
            className="px-4 duration-200 cursor-pointer font-semibold py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </Button>

          <Button className="px-4 duration-200 cursor-pointer font-semibold py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Update
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
