import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function Navbar({ title, isLoggedIn, handleLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mx-1">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="fa-solid fa-book-open"></i> {title}
          </Link>

          <div className="collapse navbar-collapse mx-5">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-3" to="/notes">
                      <i className="fa-solid fa-notes-medical"></i> Notes
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link mx-3" to="/tasks">
                      <i className="fa-solid fa-list-check"></i> Tasks
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/about">
                  <i className="fa-solid fa-address-card"></i> About Us
                </Link>
              </li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="nav-link btn btn-link mx-3"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                ) : (
                  <Link className="nav-link mx-3" to="/login">
                    <i className="fa-solid fa-user"></i> Log in
                  </Link>
                )}
              </li>

              

            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ CONFIRM LOGOUT MODAL */}
      <ConfirmModal
        show={showLogoutModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          handleLogout();
          setShowLogoutModal(false);
        }}
      />
    </>
  );
}
