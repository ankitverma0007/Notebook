import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function Navbar({ title, isLoggedIn, handleLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">

          {/* BRAND */}
          <Link className="navbar-brand fw-bold" to="/">
            <i className="fa-solid fa-book-open me-2"></i>
            {title}
          </Link>

          {/* TOGGLER (MOBILE) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* COLLAPSE MENU */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">

              {/* AUTH LINKS */}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link mx-4" to="/notes">
                      <i className="fa-solid fa-notes-medical me-1"></i>
                      Notes
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link mx-4" to="/tasks">
                      <i className="fa-solid fa-list-check me-1"></i>
                      Tasks
                    </Link>
                  </li>
                </>
              )}

              {/* COMMON LINK */}
              <li className="nav-item">
                <Link className="nav-link mx-4" to="/about">
                  <i className="fa-solid fa-address-card me-1"></i>
                  Contact
                </Link>
              </li>

              {/* LOGIN / LOGOUT */}
              <li className="nav-item mx-4">
                {isLoggedIn ? (
                  <button
                    className="nav-link bg-transparent border-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowLogoutModal(true)}
                  >
                    <i className="fa-solid fa-right-from-bracket me-1"></i>
                    Logout
                  </button>
                ) : (
                  <Link className="nav-link" to="/login">
                    <i className="fa-solid fa-user me-1"></i>
                    Login
                  </Link>
                )}
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* LOGOUT CONFIRM MODAL */}
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
