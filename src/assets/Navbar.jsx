import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mx-1">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fa-solid fa-book-open"></i>{props.title}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mx-5" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link active mx-3" to="/Notes">
                <i className="fa-solid fa-notes-medical"></i>Notes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link mx-3" to="/tasks">
                <i className="fa-solid fa-list-check"></i>Tasks
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link mx-3" to="/login">
                <i className="fa-solid fa-user"></i>Log in
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link mx-2" to="/about">
                <i className="fa-solid fa-address-card"></i>About Us
              </Link>
            </li>

          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
