import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [data, setdata] = useState({ email: "", password: "" })
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")

  const saving = (e) => { setdata({ ...data, [e.target.name]: e.target.value }); setError("") }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (data.password.length < 8) return setError("Password must be at least 8 characters long.")
    if (data.email !== "ankivermajnva@gmail.com" || data.password !== "kit@1234")
      return setError("Invalid credentials. Please try again.")
    onLogin()
  }

  const isValid = data.email && data.password

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#e2e6d8" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "420px" }}>
        <h3 className="text-center mb-2">Sign In</h3>
        <p className="text-center text-muted mb-3">Access your account securely.</p>

        <div style={{ minHeight: "55px" }}>
          {error && <div className="alert alert-danger py-2" role="alert"><strong>Sign-in failed:</strong> {error}</div>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" name="email" value={data.email} onChange={saving}
              className={`form-control ${error ? "is-invalid" : ""}`} />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type={show ? "text" : "password"} name="password" value={data.password}
              onChange={saving} className={`form-control ${error ? "is-invalid" : ""}`} />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" onChange={() => setShow(!show)} />
            <label className="form-check-label">Show Password</label>
          </div>

          <button type="submit" className="btn btn-dark w-100" disabled={!isValid}>Sign In</button>

          <div className="text-center mt-3">
            <Link to="/signup" className="text-decoration-none">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
