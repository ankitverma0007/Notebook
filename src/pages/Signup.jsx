import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Signup({ onSignUp }) {
  const [data, setdata] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")

  const saving = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (data.password.length < 8)
      return setError("Password must be at least 8 characters long.")

    if (data.password !== data.confirmPassword)
      return setError("Passwords do not match.")

    console.log("User Registered:", data)
    onSignUp()
  }

  const isValid = data.name && data.email && data.password && data.confirmPassword

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#e2e6d8" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "420px" }}>
        <h3 className="text-center mb-2">Create an Account</h3>
        <p className="text-center text-muted mb-3">Access your notes securely and stay organized.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" name="name" value={data.name} onChange={saving}
              className="form-control" placeholder="Full Name" />
          </div>

          <div className="mb-3">
            <input type="email" name="email" value={data.email} onChange={saving}
              className="form-control" placeholder="Email address" />
          </div>

          <div className="mb-3">
            <input type={show ? "text" : "password"} name="password" value={data.password} onChange={saving}
              className={`form-control ${error ? "is-invalid" : ""}`} placeholder="Password" />
          </div>

          <div className="mb-3">
            <input type={show ? "text" : "password"} name="confirmPassword" value={data.confirmPassword} onChange={saving}
              className={`form-control ${error ? "is-invalid" : ""}`} placeholder="Confirm Password" />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" onChange={() => setShow(!show)} />
            <label className="form-check-label">Show Password</label>
          </div>

          <button type="submit" className="btn btn-dark w-100" disabled={!isValid}>
            Create Account
          </button>

          <div className="text-center mt-3">
            <Link to="/login" className="text-decoration-none">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
