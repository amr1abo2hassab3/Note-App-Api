import { useEffect, useState } from "react";
import NoteCard from "../Components/NoteCard";
import { useAuth } from "../hooks/custom/useAuth";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { AxiosError } from "axios";
import type { IAddNote, IErrorResponse, INote } from "../interfaces";
import Modal from "../Components/ui/Modal";
import Button from "../Components/ui/Button";
import Textarea from "../Components/ui/Textarea";
import Input from "../Components/ui/Input";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import ErrorMessage from "../Components/ui/ErrorMessage";
import LoadingScreen from "../Components/ui/LoadingScreen";
import { noteValidation } from "../validation";
import InputErrorMessage from "../Components/ui/InputErrorMessage";

const HomePage = () => {
  // state or hooks
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<string | null>(null);
  const [errors, setErrors] = useState<IAddNote>({} as IAddNote);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<INote>({
    title: "",
    content: "",
  } as INote);
  const [noteToAdd, setNoteToAdd] = useState<IAddNote>({
    content: "",
    title: "",
  } as IAddNote);
  let errorObj;
  const { token, setNotesCount } = useAuth();

  // handler
  const config = {
    headers: {
      token: `3b8ny__${token}`,
    },
  };
  const {
    data,
    isLoading: isLoadingNotes,
    error,
    refetch,
    isError,
  } = useAuthenticatedQuery({
    queryKey: ["getUserNotes"],
    url: "/notes",
    config: config,
  });

  if (isError) {
    errorObj = error as AxiosError<IErrorResponse>;
  }

  // handler Add note
  const closeModalAdd = () => {
    setIsOpenAdd(false);
    setNoteToAdd({} as INote);
  };
  const OpenModalAdd = () => {
    setIsOpenAdd(true);
  };
  const handleChangeAdd = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setNoteToAdd((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // validation data
    const errorsReturned = noteValidation({ ...noteToAdd });
    const hasErrors = Object.values(errorsReturned).some((error) => error);
    if (hasErrors) {
      setErrors(errorsReturned);
      setIsLoading(false);
      return;
    }
    try {
      await axiosInstance.post(`/notes`, noteToAdd, {
        headers: {
          token: `3b8ny__${token}`,
        },
      });
      toast.success("note Added successfuly", {
        duration: 2000,
        position: "top-center",
      });
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModalAdd();
      setErrors({} as IAddNote);
    }
  };

  // handler edit note
  const closeModal = () => {
    setIsOpenEdit(false);
    setNoteToEdit({} as INote);
  };
  const OpenModal = (Note: INote) => {
    setIsOpenEdit(true);
    setNoteToEdit(Note);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setNoteToEdit((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // validation data
    const errorsReturned = noteValidation({
      title: noteToEdit.title,
      content: noteToEdit.content,
    });
    const hasErrors = Object.values(errorsReturned).some((error) => error);
    if (hasErrors) {
      setErrors(errorsReturned);
      setIsLoading(false);
      return;
    }

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
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModal();
      setErrors({} as IAddNote);
    }
  };
  // handler delete note
  const closeModalDelete = () => {
    setIsOpenDelete(false);
    setNoteId(null);
  };
  const openModalDelete = (id: string) => {
    setIsOpenDelete(true);
    setNoteId(id);
  };
  const handleDelete = async () => {
    setIsLoading(true);
    if (noteId) {
      try {
        await axiosInstance.delete(`/notes/${noteId}`, {
          headers: {
            token: `3b8ny__${token}`,
          },
        });
        toast.success("note Deleted successfuly", {
          duration: 2000,
          position: "top-center",
        });
        await refetch();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // render
  const renderNotesUser = data?.notes?.map((note: INote, index: number) => (
    <NoteCard
      key={note._id}
      index={index}
      note={note}
      onEdit={OpenModal}
      onDelete={openModalDelete}
    />
  ));

  useEffect(() => {
    if (data) {
      setNotesCount(data.notes.length);
    }
  }, [data]);

  if (isLoadingNotes)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
        <LoadingScreen
          size="w-15 h-15"
          color="text-[#432DD7]"
          strokeWidth={2}
        />
      </div>
    );
  return (
    <div>
      <div className="flex items-center justify-center my-5">
        <Button
          onClick={OpenModalAdd}
          className="px-4 md:w-1/4 duration-200 cursor-pointer font-semibold py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add New Note
        </Button>
        {/* add note modal */}
        <Modal closeModal={closeModalAdd} isOpen={isOpenAdd} title="Add Note">
          {" "}
          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => handleSubmitAdd(e)}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title
              </label>
              <Input
                name="title"
                onChange={handleChangeAdd}
                type="text"
                value={noteToAdd.title || ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <InputErrorMessage msg={errors.title} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Content
              </label>
              <Textarea
                name="content"
                onChange={handleChangeAdd}
                rows={4}
                value={noteToAdd.content || ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></Textarea>
              <InputErrorMessage msg={errors.content} />
            </div>
            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={closeModalAdd}
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
                  "Add Note"
                )}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isError ? (
          <ErrorMessage
            className="flex items-center space-x-3 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg shadow-sm"
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
            }
            msg={errorObj?.response?.data.msg || "Something went wrong!"}
          />
        ) : (
          renderNotesUser
        )}
      </div>
      {/* edit note modal */}
      <Modal closeModal={closeModal} isOpen={isOpenEdit} title="Edit Note">
        {" "}
        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => handleSubmitEdit(e)}>
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
            <InputErrorMessage msg={errors.title} />
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
            <InputErrorMessage msg={errors.content} />
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
      {/* delete modal */}
      <Modal title="" closeModal={closeModalDelete} isOpen={isOpenDelete}>
        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold text-red-600">
            Delete this note?
          </h3>

          <p className="text-gray-600 text-base leading-relaxed">
            Are you sure you want to delete this note? This action cannot be
            undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 pt-6">
          <Button
            onClick={closeModalDelete}
            className="px-5 cursor-pointer duration-200 py-2.5 font-medium bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              handleDelete();
              closeModalDelete();
            }}
            className="px-5 cursor-pointer duration-200 py-2.5 font-medium bg-red-600 text-white rounded-lg hover:bg-red-700"
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
              "Delete"
            )}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
