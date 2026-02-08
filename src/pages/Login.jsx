import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export default function Login({onLogin}) {
  const[data, setdata] = useState({
    email: "",
    password: ""
  })
  const[show, setShow]= useState(false)
  const [error, setError] = useState("");
  const saving =(e)=>{
    setdata({
    ...data,
    [e.target.name]: e.target.value
    });
  }
  const showpass =()=>{
    setShow(!show);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.email === "ankivermajnva@gmail.com" && data.password === "kit@123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid email or password");
    }
  };
  const isValid = data.email !== "" && data.password !== "";

  return (
   <div className="mx-5 my-5">
    <h2 className="mx-5">Login To NoteBook!</h2>
    <div className="mx-5 fs-5">Login to start writing your notes...</div>
    <form onSubmit={handleSubmit}className='mx-5 my-5'>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input style={{ backgroundColor: 'rgba(53, 78, 99, 0.34)' }} type="email" name="email" onChange ={saving} className="form-control" id="exampleInputEmail1" value={data.email} aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input style={{ backgroundColor: 'rgba(53, 78, 99, 0.34)' }} type={show ? "text" : "password"} name="password" onChange ={saving} className="form-control" value ={data.password} id="exampleInputPassword1"/>
      </div>
      <div className="mb-3 form-check">
        <input style={{ backgroundColor: 'rgba(53, 78, 99, 0.34)' }} type="checkbox" className="form-check-input" id="exampleCheck1"onClick={showpass}/>
        <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
      </div>
      <button type="submit" className="btn btn-dark mx-5" disabled={!isValid}>Please Log in</button>
      <Link to ='/signup'  type="button" className="btn btn-dark mx-5">Sign Up here...</Link>
    </form>
   </div>
  )
}
