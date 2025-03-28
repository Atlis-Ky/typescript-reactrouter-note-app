import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "./App";

type NoteLayoutProps = {
  notes: Note[];
};

export function NoteLayout({notes}: NoteLayoutProps) {
  const {id} = useParams()
  const note = notes.find(n => n.id === id)

  // navigates back to homepage if user tries to load an id in url that doesnt exist

  if (note == null) return <Navigate to="/" replace />

  return <Outlet context={note} />
}

export function useNote() {
  return useOutletContext<Note>()
}