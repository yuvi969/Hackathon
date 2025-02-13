import { useState } from 'react'

function Adminlogin() {
  const [formdata, setformdata] = useState({
    email_id: '',
    password: '',
  })

  function handlechange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }

  function handlesubmit(e) {
    e.preventDefault()
    try {
    } catch (error) {}
  }

  return (
    <>
      <div className='loginstudentdiv'>
        <h1 className='loginstudentheader'>Admin login</h1>
        <form className='login-student-form' onSubmit={handlesubmit}>
          <input
            type='email'
            name='email_id'
            placeholder='Email ID'
            value={formdata.email_id}
            onChange={handlechange}
            required
          ></input>
          <input
            type='password'
            name='password'
            value={formdata.password}
            placeholder='Password'
            onChange={handlechange}
            required
          />
          <button type='submit' className='adminloginbutton'>
            Log in
          </button>
        </form>
      </div>
    </>
  )
}

export { Adminlogin }
