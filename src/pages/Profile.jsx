import { useState } from "react";
import ConfirmModal from "../assets/ConfirmModal";

export default function Profile({
  user,
  handleLogout,
  handleDeleteAccount,
  handleDeleteAllNotes,
  handleDeleteAllTasks,
  handleChangePassword,
}) {
  const [modalConfig, setModalConfig] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const openModal = (title, message, action) => {
    setModalConfig({ title, message, action });
  };

  const handlePasswordSubmit = () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("All fields are required.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    handleChangePassword(passwordData);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordModal(false);
  };

  return (
    <div className="container py-5" style={{ maxWidth: "850px" }}>

      {/* Page Header */}
      <div className="mb-5">
        <h2 className="fw-bold">Settings</h2>
        <p className="text-muted">
          Manage your account preferences and application data.
        </p>
      </div>

      {/* Profile Card */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4 d-flex align-items-center">

          <div
            className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center me-4"
            style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h5 className="mb-1 fw-semibold">{user?.name}</h5>
            <p className="text-muted mb-0 small">{user?.email}</p>
          </div>

        </div>
      </div>
      {/* Data Management */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h6 className="text-uppercase text-muted small mb-4">
            Data Management
          </h6>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">Delete All Notes</h6>
              <small className="text-muted">
                Permanently remove all your notes.
              </small>
            </div>
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={() =>
                openModal(
                  "Delete All Notes",
                  "This will permanently delete all notes.",
                  handleDeleteAllNotes
                )
              }
            >
              Delete
            </button>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Delete All Tasks</h6>
              <small className="text-muted">
                Permanently remove all your tasks.
              </small>
            </div>
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={() =>
                openModal(
                  "Delete All Tasks",
                  "This will permanently delete all tasks.",
                  handleDeleteAllTasks
                )
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h6 className="text-uppercase text-muted small mb-4">
            Account
          </h6>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">Change Password</h6>
              <small className="text-muted">
                Update your account password securely.
              </small>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowPasswordModal(true)}
            >
              Change
            </button>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Logout</h6>
              <small className="text-muted">
                Sign out from your account.
              </small>
            </div>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() =>
                openModal(
                  "Confirm Logout",
                  "Are you sure you want to logout?",
                  handleLogout
                )
              }
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-danger border-2 rounded-4 mb-5">
        <div className="card-body p-4">
          <h6 className="text-danger text-uppercase small mb-4">
            Danger Zone
          </h6>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1 text-danger">Delete Account</h6>
              <small className="text-muted">
                Permanently delete your account and all associated data.
              </small>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                openModal(
                  "Delete Account",
                  "This action cannot be undone.",
                  () => {
                    handleDeleteAccount();
                    handleLogout();
                  }
                )
              }
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Contact Footer */}
      <footer className="pt-4 border-top text-center text-muted small">
        <h6 className="fw-semibold mb-2">Contact Us</h6>

        <p className="mb-1">
          Need help? Reach out to our support team.
        </p>

        <p className="mb-2">
          <a
            href="mailto:support@notebookapp.com"
            className="text-decoration-none"
          >
            support@notebookapp.com
          </a>
        </p>

        <small>
          © {new Date().getFullYear()} Notebook App. All rights reserved.
        </small>
      </footer>

      {/* Confirm Modal */}
      {modalConfig && (
        <ConfirmModal
          show={true}
          title={modalConfig.title}
          message={modalConfig.message}
          onCancel={() => setModalConfig(null)}
          onConfirm={() => {
            modalConfig.action();
            setModalConfig(null);
          }}
        />
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">

              <div className="modal-header border-0">
                <h5 className="fw-bold">Change Password</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowPasswordModal(false)}
                ></button>
              </div>

              <div className="modal-body">

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />

                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />

              </div>

              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handlePasswordSubmit}
                >
                  Update Password
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
