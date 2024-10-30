import { Task } from "@/types";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
    notes: Task["notes"]
}

export default function NotesPanel({ notes }: NotesPanelProps) {
    return (
        <>
            <AddNoteForm />
            <div className="mt-5">
                {notes.length ? (
                    <>
                        <p className="font-bold">Notes:</p>
                        <div className="divide-y divide-gray-200">
                            {notes.map(note => <NoteDetail key={note._id} note={note} />)}
                        </div>
                    </>
                ) : <p className="text-gray-400 text-center">There are no notes</p>}
            </div>
        </>
    )
}
