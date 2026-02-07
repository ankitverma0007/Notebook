import React, {useState} from 'react'

export default function Login() {
  const[data, setdata] = useState({
    email: "",
    password: ""
  })
  const[show, setShow]= useState(false)
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
    console.log("Email:", data.email);
    console.log("Password:", data.password);
  };
  const isValid = data.email !== "" && data.password !== "";

  return (
   <div className="mx-5 my-5">
    <h2 className="mx-5">Welcome To NoteBook!</h2>
    <div className="mx-5 fs-5">Login to acess your notes...</div>
    <form onSubmit={handleSubmit}className='mx-5 my-5'>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" name="email" onChange ={saving} className="form-control" id="exampleInputEmail1" value={data.email} aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type={show ? "text" : "password"} name="password" onChange ={saving} className="form-control" value ={data.password} id="exampleInputPassword1"/>
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"onClick={showpass}/>
        <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
      </div>
      <button type="submit" className="btn btn-secondary mx-5" disabled={!isValid}>Please Log in</button>
      <button type="button" className="btn btn-secondary mx-5">Sign Up here...</button>
    </form>
   </div>
  )
}
