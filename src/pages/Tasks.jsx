import React, { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [currentTask, setCurrentTask] = useState({
    id: null,
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
  });


  const handleOpenAdd = () => {
    setCurrentTask({ id: null, title: "", description: "" });
    setErrors({ title: false, description: false });
    setShowModal(true);
  };

  const handleOpenEdit = (task) => {
    setCurrentTask(task);
    setErrors({ title: false, description: false });
    setShowModal(true);
  };


  const handleSaveTask = () => {
    const titleEmpty = !currentTask.title.trim();
    const descEmpty = !currentTask.description.trim();

    setErrors({
      title: titleEmpty,
      description: descEmpty,
    });

    if (titleEmpty || descEmpty) return;

    if (currentTask.id) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === currentTask.id ? currentTask : t
        )
      );
    } else {
      const newTask = {
        ...currentTask,
        id: Date.now(),
        createdAt: new Date(),
        read: false,
      };

      setTasks((prev) => [newTask, ...prev]);
    }

    setShowModal(false);
  };


  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };


  const handleToggleRead = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, read: !t.read } : t
      )
    );
  };

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Task Dashboard</h2>
          <p className="text-muted small mb-0">
            Organize and track your tasks efficiently
          </p>
        </div>

        <button className="btn btn-dark" onClick={handleOpenAdd}>
          + Add Task
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <h5>No tasks yet</h5>
          <p className="small">
            Click "Add Task" to create one.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {tasks.map((t) => {
            const date = new Date(t.createdAt);

            return (
              <div key={t.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body d-flex flex-column p-4">

                    <div className="d-flex justify-content-between mb-3">
                      <h5
                        className={`fw-semibold ${
                          t.read
                            ? "text-decoration-line-through text-muted"
                            : ""
                        }`}
                      >
                        {t.title}
                      </h5>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          id={`read-${t.id}`}
                          className="form-check-input"
                          checked={t.read}
                          onChange={() => handleToggleRead(t.id)}
                        />
                        <label
                          className="form-check-label small"
                          htmlFor={`read-${t.id}`}
                        >
                          Mark as Done
                        </label>
                      </div>
                    </div>

                    <p
                      className={`flex-grow-1 small ${
                        t.read
                          ? "text-decoration-line-through text-muted"
                          : "text-muted"
                      }`}
                    >
                      {t.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center small mb-3">
                      <span
                        className={`badge ${
                          t.read ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {t.read ? "Completed" : "Active"}
                      </span>

                      <span className="text-secondary">
                        {date.toLocaleDateString()} •{" "}
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="d-flex gap-2">
                      {!t.read && (
                        <button
                          onClick={() => handleOpenEdit(t)}
                          className="btn btn-sm btn-outline-primary flex-fill"
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(t.id)}
                        className="btn btn-sm btn-outline-danger flex-fill"
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">

              <div className="modal-header border-0">
                <h5 className="modal-title fw-semibold">
                  {currentTask.id ? "Edit Task" : "Add New Task"}
                </h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">

                {/* Title */}
                <input
                  type="text"
                  className={`form-control mb-1 ${
                    errors.title ? "is-invalid" : ""
                  }`}
                  placeholder="Task title"
                  value={currentTask.title}
                  onChange={(e) => {
                    setCurrentTask({
                      ...currentTask,
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

                {/* Description */}
                <textarea
                  className={`form-control mt-3 mb-1 ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  rows="3"
                  placeholder="Task description"
                  value={currentTask.description}
                  onChange={(e) => {
                    setCurrentTask({
                      ...currentTask,
                      description: e.target.value,
                    });
                    setErrors({ ...errors, description: false });
                  }}
                ></textarea>

                {errors.description && (
                  <div className="invalid-feedback d-block">
                    Description is required.
                  </div>
                )}

              </div>

              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className={`btn ${
                    currentTask.id ? "btn-warning" : "btn-dark"
                  }`}
                  onClick={handleSaveTask}
                >
                  {currentTask.id ? "Update Task" : "Add Task"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
