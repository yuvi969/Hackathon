import { useState } from 'react'
import { login } from './services'
import { useNavigate } from 'react-router'

function Studentlogin() {
  const [formdata, setformdata] = useState({
    email: '',
    password: '',
  })

  function handlechange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()

  async function handlesubmit(e) {
    e.preventDefault()
    try {
      const { email, password } = formdata
      await login({ email, password })
      navigate('/student/home')
    } catch (error) {
      console.log(error)
      alert('Invalid credentials')
    }
  }

  return (
    <>
      <div className='loginstudentdiv'>
        <h1 className='loginstudentheader'>Student login</h1>
        <form className='login-student-form' onSubmit={handlesubmit}>
          <input
            type='email'
            name='email'
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
          <button type='submit' className='studentloginbutton'>
            Log in
          </button>
        </form>
      </div>
    </>
  )
}

export { Studentlogin }
