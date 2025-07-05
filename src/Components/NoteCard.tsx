import { Pencil, Trash2 } from "lucide-react";
import Button from "./ui/Button";
import type { INote } from "../interfaces";
import { formatDate } from "../lib/utils";

interface IProps {
  index: number;
  note: INote;
  onEdit: (Note: INote) => void;
  onDelete: (id: string) => void;
}

const NoteCard = ({ note, onEdit, onDelete, index }: IProps) => {
  const { title, content, createdAt, updatedAt } = note;
  return (
    <div className="bg-white flex flex-col justify-between w-full max-w-lg rounded-2xl p-6 space-y-6 shadow-xl border border-gray-200 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-3">
          <span className="text-base text-gray-400">#{index + 1}</span> {title}
        </h2>
      </div>

      {/* Content */}
      <blockquote className="text-gray-800 text-lg leading-relaxed pl-4 border-l-4 border-indigo-600">
        {content}
      </blockquote>

      {/* Dates */}
      <div className="grid grid-cols-2 text-sm text-gray-500 pt-3 border-t pt-4">
        <p>Created: {formatDate(createdAt)}</p>
        <p className="text-right">Updated: {formatDate(updatedAt)}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 pt-3">
        <Button
          onClick={() => {
            onEdit(note);
          }}
          className="flex duration-200 cursor-pointer items-center gap-2 px-4 py-2 bg-yellow-400 text-white text-base font-medium rounded-lg hover:bg-yellow-500"
        >
          <Pencil size={18} />
          Edit
        </Button>

        <Button
          onClick={() => {
            onDelete(note._id);
          }}
          className="flex duration-200 cursor-pointer items-center gap-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-lg hover:bg-red-600"
        >
          <Trash2 size={18} />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default NoteCard;
