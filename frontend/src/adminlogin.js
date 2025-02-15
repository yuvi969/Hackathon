import { useState } from 'react'
import { login } from './services'
import { useNavigate } from 'react-router'

function Adminlogin() {
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
      navigate('/admin/home')
    } catch (error) {
      console.log(error)
      alert('Invalid credentials')
    }
  }

  return (
    <>
      <div className='loginadmindiv'>
        <h1 className='loginadminheader'>Admin login</h1>
        <form className='login-admin-form' onSubmit={handlesubmit}>
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
          <button type='submit' className='adminloginbutton'>
            Log in
          </button>
        </form>
      </div>
    </>
  )
}

export { Adminlogin }
