import { Pencil, Trash2 } from "lucide-react";
import Button from "./ui/Button";
import type { INote } from "../interfaces";
import { formatDate } from "../lib/utils";

interface IProps {
  index: number;
  note: INote;
  onEdit: (Note: INote) => void;
  onDelete: () => void;
}

const NoteCard = ({ note, onEdit, onDelete, index }: IProps) => {
  const { title, content, createdAt, updatedAt } = note;
  return (
    <div className="bg-white w-full max-w-md rounded-xl p-5 space-y-5 shadow-lg border border-gray-100 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
          <span className="text-sm text-gray-400">#{index + 1}</span> {title}
        </h2>
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 text-base leading-relaxed pl-3 border-l-4 border-indigo-500">
        {content}
      </blockquote>

      {/* Dates */}
      <div className="grid grid-cols-2 text-xs text-gray-500 pt-2 border-t pt-3">
        <p>Created: {formatDate(createdAt)}</p>
        <p className="text-right">Updated: {formatDate(updatedAt)}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-3 pt-2">
        <Button
          onClick={() => {
            onEdit(note);
          }}
          className="flex duration-200 cursor-pointer items-center gap-1 px-3 py-1.5 bg-yellow-400 text-white text-sm font-medium rounded-lg hover:bg-yellow-500"
        >
          <Pencil size={16} />
          Edit
        </Button>

        <Button
          onClick={onDelete}
          className="flex duration-200 cursor-pointer items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600"
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default NoteCard;
