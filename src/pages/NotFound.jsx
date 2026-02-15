import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <p>The page you are looking for does not exist.</p>

      <Link to="/" className="btn btn-dark mt-3">
        Go Back Home
      </Link>
    </div>
  );
}
