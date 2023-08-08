import React from "react";
import "./archive.css";
// import Navbar from "../../components/Navbar/navbar";
import Sidebar from "./Sidebar-notes";
import useNotesData from "../Assets/useNotesData";
import Note from "../Note/Note";
import Layout from "../Layout/Layout";

const Archive = () => {
  document.title = "Note Zone | Archive";
  const { archived } = useNotesData();

  const archivedNotes = archived.map((note) => (
    <Note key={note.id} note={note} />
  ));
  return (
    <div className="archive">
      <h1 className="page-title">Archive</h1>

      <div className="archive-main">
        <section>
          <Layout>
            {archivedNotes.length !== 0 ? (
              <Layout>{archivedNotes}</Layout>
            ) : (
              <p>No notes in archived!</p>
            )}
          </Layout>
        </section>
      </div>
    </div>
  );
};

export default Archive;
