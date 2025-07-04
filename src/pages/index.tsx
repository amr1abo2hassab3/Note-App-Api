import { useState } from "react";
import NoteCard from "../Components/NoteCard";
import { useAuth } from "../hooks/custom/useAuth";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { AxiosError } from "axios";
import type { IErrorResponse, INote } from "../interfaces";
import Modal from "../Components/ui/Modal";
import Button from "../Components/ui/Button";
import Textarea from "../Components/ui/Textarea";
import Input from "../Components/ui/Input";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";

const HomePage = () => {
  // state or hooks
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<INote>({} as INote);
  let errorObj;
  const { token } = useAuth();

  // handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setNoteToEdit((prev) => ({ ...prev, [name]: value }));
  };
  const config = {
    headers: {
      token: `3b8ny__${token}`,
    },
  };
  const {
    data,
    isLoading: isLoadingNotes,
    error,
    isError,
  } = useAuthenticatedQuery({
    queryKey: ["getUserNotes", `${noteToEdit._id}`],
    url: "/notes",
    config: config,
  });

  if (isError) {
    errorObj = error as AxiosError<IErrorResponse>;
  }

  const closeModal = () => {
    setIsOpenEdit(false);
    setNoteToEdit({} as INote);
  };
  const OpenModal = (Note: INote) => {
    setIsOpenEdit(true);
    setNoteToEdit(Note);
  };
  const handleDelelte = () => {
    console.log("delete");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.put(
        `/notes/${noteToEdit._id}`,
        {
          title: noteToEdit.title,
          content: noteToEdit.content,
        },
        {
          headers: {
            token: `3b8ny__${token}`,
          },
        }
      );
      toast.success("note updated successfuly", {
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  // render
  const renderNotesUser = data?.notes?.map((note: INote, index: number) => (
    <NoteCard
      key={note._id}
      index={index}
      note={note}
      onEdit={OpenModal}
      onDelete={handleDelelte}
    />
  ));

  if (isLoadingNotes) return <h1>loading ....</h1>;
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isError ? <h1>{errorObj?.response?.data.msg}</h1> : renderNotesUser}
      </div>
      <Modal closeModal={closeModal} isOpen={isOpenEdit} title="Edit Note">
        {" "}
        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <Input
              name="title"
              onChange={handleChange}
              type="text"
              value={noteToEdit.title || ""}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Content
            </label>
            <Textarea
              name="content"
              onChange={handleChange}
              rows={4}
              value={noteToEdit.content || ""}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></Textarea>
          </div>
          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={closeModal}
              className="px-4 duration-200 cursor-pointer font-semibold py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="px-4 duration-200 cursor-pointer font-semibold py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HomePage;
