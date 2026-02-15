import React, { useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    content: false,
  });

  // Open Add Modal
  const handleOpenAdd = () => {
    setCurrentNote({ id: null, title: "", content: "" });
    setErrors({ title: false, content: false });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (note) => {
    setCurrentNote(note);
    setErrors({ title: false, content: false });
    setShowModal(true);
  };

  // Open Viewer
  const handleOpenViewer = (note) => {
    setCurrentNote(note);
    setShowViewer(true);
  };

  // Save Note with Validation
  const handleSaveNote = () => {
    const titleEmpty = !currentNote.title.trim();
    const contentEmpty = !currentNote.content.trim();

    setErrors({
      title: titleEmpty,
      content: contentEmpty,
    });

    if (titleEmpty || contentEmpty) return;

    if (currentNote.id) {
      setNotes(notes.map(n =>
        n.id === currentNote.id ? currentNote : n
      ));
    } else {
      const newNote = {
        ...currentNote,
        id: Date.now(),
        createdAt: new Date(),
      };
      setNotes([newNote, ...notes]);
    }

    setShowModal(false);
  };

  // Delete Note
  const handleDelete = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1">Notes</h2>
          <p className="text-muted small mb-0">
            Clean. Focused. Distraction-free writing.
          </p>
        </div>

        <button className="btn btn-dark px-4" onClick={handleOpenAdd}>
          + New Note
        </button>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <h5>No notes yet</h5>
        </div>
      ) : (
        <div className="row g-4">
          {notes.map(n => {
            const preview =
              n.content.length > 150
                ? n.content.substring(0, 150) + "..."
                : n.content;

            const date = new Date(n.createdAt);

            return (
              <div key={n.id} className="col-md-6 col-lg-4">
                <div
                  className="card h-100 border-0 shadow-sm rounded-4 p-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenViewer(n)}
                >
                  <h5 className="fw-semibold mb-3">
                    {n.title}
                  </h5>

                  <p className="text-muted small flex-grow-1">
                    {preview}
                  </p>

                  <div className="small text-secondary mt-3">
                    {date.toLocaleDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">

              <div className="modal-header border-0 px-4 py-3">
                <h5 className="modal-title fw-bold">
                  {currentNote.id ? "Edit Note" : "Create Note"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body px-4 py-4">

                {/* Title Input */}
                <input
                  type="text"
                  className={`form-control form-control-lg mb-1 ${
                    errors.title ? "is-invalid" : ""
                  }`}
                  placeholder="Title"
                  value={currentNote.title}
                  onChange={(e) => {
                    setCurrentNote({
                      ...currentNote,
                      title: e.target.value,
                    });
                    setErrors({ ...errors, title: false });
                  }}
                />

                {errors.title && (
                  <div className="invalid-feedback d-block">
                    Title is required.
                  </div>
                )}

                {/* Content Input */}
                <textarea
                  className={`form-control mt-4 mb-1 ${
                    errors.content ? "is-invalid" : ""
                  }`}
                  rows="8"
                  placeholder="Write your note..."
                  value={currentNote.content}
                  onChange={(e) => {
                    setCurrentNote({
                      ...currentNote,
                      content: e.target.value,
                    });
                    setErrors({ ...errors, content: false });
                  }}
                ></textarea>

                {errors.content && (
                  <div className="invalid-feedback d-block">
                    Content cannot be empty.
                  </div>
                )}

              </div>

              <div className="modal-footer border-0 px-4 py-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-dark"
                  onClick={handleSaveNote}
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Professional Full Viewer */}
      {showViewer && (
        <div className="modal d-block bg-dark bg-opacity-75">
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg">

              <div className="modal-header border-0 px-5 pt-5 pb-3 position-relative">
                <div className="w-100 text-center">
                  <h2 className="fw-bold mb-2" style={{ fontSize: "2rem" }}>
                    {currentNote.title}
                  </h2>

                  <p className="text-muted small mb-0">
                    {new Date(currentNote.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  className="btn-close position-absolute top-0 end-0 m-4"
                  onClick={() => setShowViewer(false)}
                ></button>
              </div>

              <div
                className="modal-body px-5 pb-5"
                style={{
                  maxHeight: "65vh",
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.9",
                    color: "#333",
                    whiteSpace: "pre-line",
                    maxWidth: "800px",
                    margin: "0 auto",
                  }}
                >
                  {currentNote.content}
                </div>
              </div>

              <div className="modal-footer border-0 px-5 pb-5 d-flex justify-content-center gap-3">
                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={() => {
                    setShowViewer(false);
                    handleOpenEdit(currentNote);
                  }}
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button
                  className="btn btn-outline-danger px-4"
                  onClick={() => {
                    handleDelete(currentNote.id);
                    setShowViewer(false);
                  }}
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>

                <button
                  className="btn btn-dark px-4"
                  onClick={() => setShowViewer(false)}
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
