import React from "react";
import "./bin.css";
import useNotesData from "../../Assets/useNotesData";
import Note from "../../Note/Note";
import Layout from "../../Layout/Layout";

const Bin = () => {
  document.title = "Note Zone | Bin";
  const { deleted } = useNotesData();

  const deletedNotes = deleted?.map((note) => (
    <Note key={note.id} note={note} />
  ));

  return (
    <div className="bin">
      <h1 className="page-title">Bin</h1>

      <div className="bin-main">
        <section>
          <Layout>
            {deletedNotes.length !== 0 ? (
              <Layout>{deletedNotes}</Layout>
            ) : (
              <p>No notes in bin!</p>
            )}
          </Layout>
        </section>
      </div>
    </div>
  );
};

export default Bin;
